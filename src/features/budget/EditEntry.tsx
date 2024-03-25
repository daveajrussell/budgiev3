import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { useState } from "react";
import { Delete } from "./Delete";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategories } from "../categories/categorySlice";
import { Listbox } from "@headlessui/react";
import { editEntry, selectEntry } from "./budgetSlice";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { nanoid } from "nanoid";

export const EditEntry = () => {
  const { id } = useParams();
  const categories = useAppSelector((rootState) => selectCategories(rootState));
  const navigate = useNavigate();
  const { date, categoryId, amount } = useAppSelector((rootState) =>
    selectEntry(rootState, id)
  );
  const dispatch = useAppDispatch();
  const category =
    categories[categories.findIndex((c) => c.id === categoryId)] ??
    categories[0];
  const [entryCategory, setEntryCategory] = useState(category);
  const [entryDate, setEntryDate] = useState(date);
  const [entryAmount, setEntryAmount] = useState(amount);
  const [isOpen, setIsOpen] = useState(false);

  function saveEntry() {
    dispatch(
      editEntry({
        id: id ?? nanoid(),
        date: entryDate,
        categoryId: entryCategory.id,
        amount: entryAmount,
      })
    );
    navigate("/budget");
  }

  function closeModal() {
    setIsOpen(false);
    navigate("/budget");
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Budget entry
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                    value={entryDate}
                    onChange={(event) => setEntryDate(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <Listbox
                  as="div"
                  className="relative inline-block text-left"
                  value={entryCategory}
                  onChange={setEntryCategory}
                  name="category"
                  id="category"
                >
                  {({ open }) => (
                    <>
                      <Listbox.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {entryCategory.name}
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
                        {categories.map((category) => (
                          <Listbox.Option key={category.id} value={category}>
                            <span className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer">
                              {category.name}
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
                    value={entryAmount}
                    onChange={(event) =>
                      setEntryAmount(parseInt(event.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <NavLink to="/budget">
            <Button text="Cancel" type="button" color="secondary" />
          </NavLink>
          <Button
            text="Save"
            type="button"
            color="primary"
            onClick={() => saveEntry()}
          />
        </div>
      </div>
      {id ? <Delete id={id} isOpen={isOpen} closeModal={closeModal} /> : null}
    </>
  );
};
