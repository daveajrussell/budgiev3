import { Listbox } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Delete } from './Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editAccount, selectAccount } from './accountSlice';
import { CirclePicker, ColorResult } from 'react-color';
import { AccountType } from 'budgie-core';
import { AccountDto } from './Accounts';

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    name,
    type: typeValue,
    typeName,
    amount,
    color,
  } = useAppSelector((rootState) => selectAccount(rootState, Number(id)));
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: name,
    type: typeValue ?? 0,
    amount: amount,
    color: color,
  });

  const handleChange = (prop: string, value: string | number) => {
    setFormData({ ...formData, [prop]: value });
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    accountTypeName.current = AccountType[formData.type];
  }, [formData.type]);

  const accountTypeName = useRef(typeName);

  function saveAccount() {
    const account = {
      id: Number(id),
      name: formData.name,
      type: formData.type,
      typeName: accountTypeName.current,
      amount: formData.amount,
      color: formData.color,
    } as AccountDto;
    dispatch(editAccount(account));
    navigate('/accounts');
  }

  function closeModal() {
    setIsOpen(false);
    navigate('/accounts');
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <h1 className="py-2">{id ? 'Edit Account' : 'New Account'}</h1>

      <form onSubmit={saveAccount} className="border-b border-gray-900/10 py-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  value={formData.name}
                  onChange={(event) =>
                    handleChange(event.target.name, event.target.value)
                  }
                />
              </div>
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
                  onChange={(event) =>
                    handleChange(
                      event.target.name,
                      parseInt(event.target.value),
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="type"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Type
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <Listbox
                as="div"
                className="relative inline-block text-left"
                value={formData.type}
                onChange={(value: string | number) => {
                  handleChange('type', value);
                }}
                name="type"
              >
                {({ open }) => (
                  <>
                    <Listbox.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      {accountTypeName.current}
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
                      {Object.keys(AccountType)
                        .filter((key) => !isNaN(Number(key)))
                        .map((type: any) => (
                          <Listbox.Option key={type} value={type}>
                            <span className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer">
                              {AccountType[type]}
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
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Color
            </label>
            <div className="mt-2">
              <CirclePicker
                color={formData.color}
                onChangeComplete={(value: ColorResult) =>
                  handleChange('color', value.hex)
                }
              />
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
          <NavLink to="/accounts">
            <Button text="Cancel" type="button" color="secondary" />
          </NavLink>
          <Button
            text="Save"
            type="button"
            color="primary"
            onClick={() => saveAccount()}
          />
        </div>
      </div>
      {id ? (
        <Delete id={Number(id)} isOpen={isOpen} closeModal={closeModal} />
      ) : null}
    </>
  );
};
