import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { types } from "./Categories";
import { Form, NavLink } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { categoryLoader } from "./loaders";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Delete } from "./Delete";

export const Edit = () => {
  const { category } = useLoaderData<typeof categoryLoader>();
  const [typeDisplay, updateTypeDisplay] = useState(category.type ?? "Type");
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Form id="category-form" method="post">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Category
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                      defaultValue={category.name}
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
                  <input
                    type="hidden"
                    name="type"
                    id="type"
                    defaultValue={typeDisplay}
                  />
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {typeDisplay}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {Object.values(types).map((type) => {
                          return (
                            <Menu.Item key={type}>
                              <span
                                className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                                onClick={() => updateTypeDisplay(type)}
                              >
                                {type}
                              </span>
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              text="Delete"
              type="button"
              color="delete"
              onClick={openModal}
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <NavLink to="/categories">
              <Button text="Cancel" type="button" color="secondary" />
            </NavLink>
            <Button text="Save" type="submit" color="primary" />
          </div>
        </div>
      </Form>
      <Delete id={category.id} isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};
