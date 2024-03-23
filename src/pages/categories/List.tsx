import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";
import classNames from "../../helpers/class-names";
import { Category, types } from "./Categories";
import { useLoaderData } from "react-router-typesafe";
import { categoriesLoader } from "./loaders";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../components/Button";
import { Delete } from "./Delete";
import { useRef, useState } from "react";

export const List = () => {
  const { categories } = useLoaderData<typeof categoriesLoader>();
  const [isOpen, setIsOpen] = useState(false);
  const idToDelete = useRef("");
  const headers =
    categories && categories.length
      ? Object.keys(categories[0]).filter((header) => header !== "id")
      : [];

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1>Categories</h1>
        <NavLink to="new">
          <Button text="Add new" type="button" thing="secondary" />
        </NavLink>
      </div>

      <div className="w-full mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <table className="border-collapse table-auto w-full text-left text-sm">
          <thead>
            <tr>
              <th className="border border-t-0 border-r-0 border-l-0 border-gray-600"></th>
              {headers.map((header) => {
                return (
                  <th
                    key={header}
                    className="border border-t-0 border-r-0 border-l-0 border-gray-600 capitalize py-3"
                  >
                    {header}
                  </th>
                );
              })}
              <th className="border border-t-0 border-r-0 border-l-0 border-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: Category) => (
              <tr key={category.id}>
                <td className="border border-t-0 border-r-0 border-l-0 border-gray-600 text-center py-3">
                  {category.type === types.income ? (
                    <ArrowTrendingUpIcon className="-mr-1 h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="-mr-1 h-5 w-5 text-red-500" />
                  )}
                </td>
                {Object.keys(category).map((key, index) =>
                  key !== "id" ? (
                    <td
                      key={`${category.id}-${index}`}
                      className={classNames(
                        index === 1 ? "" : "text-gray-600",
                        "border border-t-0 border-r-0 border-l-0 border-gray-700 slashed-zero py-3"
                      )}
                    >
                      {category[key]}
                    </td>
                  ) : null
                )}
                <td className="border border-t-0 border-r-0 border-l-0 border-gray-600 text-center py-3">
                  <span className="flex justify-evenly">
                    <NavLink
                      to={category.id}
                      className=" font-semibold text-gray-900 hover:text-violet-500"
                    >
                      <PencilIcon className="-mr-1 h-5 w-5" />
                    </NavLink>

                    <span
                      className=" font-semibold text-gray-900 hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        idToDelete.current = category.id;
                        openModal();
                      }}
                    >
                      <TrashIcon className="-mr-1 h-5 w-5" />
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Delete id={idToDelete.current} isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};
