import { Listbox } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { Delete } from './Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { editCategory, selectCategory } from './categorySlice';
import { CirclePicker, ColorResult } from 'react-color';
import { CategoryType } from 'budgie-core';

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { name, type, amount, color } = useAppSelector((rootState) =>
    selectCategory(rootState, Number(id)),
  );
  const dispatch = useAppDispatch();
  const [categoryName, setName] = useState(name);
  const [categoryType, setType] = useState(type ?? 'Type');
  const [categoryAmount, setAmount] = useState(amount);
  const [categoryColor, setColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeComplete = (color: ColorResult) => {
    console.log(color.hex);
    setColor(color.hex);
  };

  function saveCategory() {
    dispatch(
      editCategory({
        id: Number(id),
        name: categoryName,
        type: categoryType,
        amount: categoryAmount,
        color: categoryColor,
      }),
    );
    navigate('/categories');
  }

  function closeModal() {
    setIsOpen(false);
    navigate('/categories');
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <h1 className="py-2">{id ? 'Edit Category' : 'New Category'}</h1>

      <div className="border-b border-gray-900/10 py-6">
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
                  value={categoryName}
                  onChange={(event) => setName(event.target.value)}
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
                  value={categoryAmount}
                  onChange={(event) => setAmount(parseInt(event.target.value))}
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
                value={categoryType}
                onChange={setType}
                name="type"
              >
                {({ open }) => (
                  <>
                    <Listbox.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      {categoryType}
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
                      {Object.values(CategoryType).map((type) => (
                        <Listbox.Option key={type} value={type}>
                          <span className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer">
                            {type}
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
                color={categoryColor}
                onChangeComplete={handleChangeComplete}
              />
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
          <NavLink to="/categories">
            <Button text="Cancel" type="button" color="secondary" />
          </NavLink>
          <Button
            text="Save"
            type="button"
            color="primary"
            onClick={() => saveCategory()}
          />
        </div>
      </div>
      {id ? (
        <Delete id={Number(id)} isOpen={isOpen} closeModal={closeModal} />
      ) : null}
    </>
  );
};
