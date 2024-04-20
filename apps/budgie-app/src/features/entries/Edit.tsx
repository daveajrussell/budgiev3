import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import { Delete } from './Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAccounts, selectAllAccounts } from '../accounts/accountSlice';
import { Listbox } from '@headlessui/react';
import { editEntry, selectEntry } from './entriesSlice';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

export const Edit = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const accounts = useAppSelector((rootState) => selectAllAccounts(rootState));

  const accountsStatus = useAppSelector((state) => state.account.status);

  useEffect(() => {
    if (accountsStatus === 'idle') {
      dispatch(fetchAccounts());
    }
  }, [accountsStatus, dispatch]);

  const { date, accountId, amount } = useAppSelector((rootState) =>
    selectEntry(rootState, Number(id)),
  );

  const accountMap = new Map();
  accounts.map((c) => accountMap.set(c.id, c.name));

  const [formData, setFormData] = useState({
    date: date,
    accountId: accountId,
    amount: amount,
  });

  const handleChange = (prop: string, value: string | number) => {
    setFormData({ ...formData, [prop]: value });
  };

  const [isOpen, setIsOpen] = useState(false);

  function saveEntry() {
    dispatch(
      editEntry({
        id: Number(id),
        date: formData.date,
        accountId: Number(formData.accountId),
        amount: formData.amount,
      }),
    );
    navigate('/entries');
  }

  function closeModal() {
    setIsOpen(false);
    navigate('/entries');
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <h1 className="py-2">{id ? 'Edit Entry' : 'New Entry'}</h1>

      <form className="border-b border-gray-900/10 py-6" onSubmit={saveEntry}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="date"
                  name="date"
                  id="date"
                  autoComplete="date"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={formData.date}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="account"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Account
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <Listbox
                as="div"
                className="relative inline-block text-left"
                value={formData.accountId}
                onChange={(accountId) => handleChange('accountId', accountId)}
                name="accountId"
                id="accountId"
              >
                {({ open }) => (
                  <>
                    <Listbox.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      {accountMap.get(formData.accountId)}
                      {open ? (
                        <ChevronUpIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {accounts.map((account) => (
                        <Listbox.Option key={account.id} value={account.id}>
                          <span className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer">
                            {account.name}
                          </span>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </>
                )}
              </Listbox>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  autoComplete="amount"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={formData.amount}
                  onChange={(e) =>
                    handleChange(e.target.name, parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="flex justify-between">
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {id ? (
            <Button
              text="Delete"
              type="button"
              color="delete"
              onClick={openModal}
            />
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <NavLink to="/entries">
            <Button text="Cancel" type="button" color="secondary" />
          </NavLink>
          <Button
            text="Save"
            type="submit"
            color="primary"
            onClick={() => saveEntry()}
          />
        </div>
      </div>
      {id ? (
        <Delete id={Number(id)} isOpen={isOpen} closeModal={closeModal} />
      ) : null}
    </>
  );
};
