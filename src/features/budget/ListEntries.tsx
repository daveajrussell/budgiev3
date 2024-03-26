import { NavLink } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "../categories/categorySlice";
import { selectEntries } from "./budgetSlice";
import { useRef, useState } from "react";
import { DeleteEntry } from "./DeleteEntry";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { BudgetEntry } from "./Budget";
import { types } from "../../types/category-types";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";
import {
  Table,
  TableBody,
  TableBodyRow,
  TableBodyRowData,
  TableHeaderRow,
  TableHeaderRowData,
} from "../../components/table/Table";

export const ListEntries = () => {
  const categories = useAppSelector((rootState) => selectCategories(rootState));
  const categoryMap = new Map();
  categories.map((c) => categoryMap.set(c.id, c.name));
  const entries = useAppSelector((rootState) => selectEntries(rootState));
  const [isOpen, setIsOpen] = useState(false);
  const idToDelete = useRef("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <h1>Budget entries</h1>
        <NavLink to="entry/new">
          <Button text="Add new" type="button" color="secondary" />
        </NavLink>
      </div>

      <div className="w-full mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Table>
          <TableHeaderRow>
            <TableHeaderRowData></TableHeaderRowData>
            <TableHeaderRowData>Date</TableHeaderRowData>
            <TableHeaderRowData>Category</TableHeaderRowData>
            <TableHeaderRowData>Amount</TableHeaderRowData>
            <TableHeaderRowData></TableHeaderRowData>
          </TableHeaderRow>
          <TableBody>
            {entries.map((entry: BudgetEntry) => {
              const category = categories.find(
                (c) => c.id === entry.categoryId
              );
              return (
                <TableBodyRow key={entry.id}>
                  <TableBodyRowData>
                    {category?.type === types.income ? (
                      <ArrowTrendingUpIcon className="-mr-1 h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowTrendingDownIcon className="-mr-1 h-5 w-5 text-red-500" />
                    )}
                  </TableBodyRowData>
                  <TableBodyRowData>{entry.date}</TableBodyRowData>
                  <TableBodyRowData>{category?.name}</TableBodyRowData>
                  <TableBodyRowData>
                    £{entry.amount.toLocaleString()}
                  </TableBodyRowData>
                  <TableBodyRowData>
                    <span className="flex justify-evenly">
                      <NavLink
                        to={"entry/" + entry.id}
                        className=" font-semibold text-gray-900 hover:text-violet-500"
                      >
                        <PencilIcon className="-mr-1 h-5 w-5" />
                      </NavLink>

                      <span
                        className=" font-semibold text-gray-900 hover:text-red-500 cursor-pointer"
                        onClick={() => {
                          idToDelete.current = entry.id;
                          openModal();
                        }}
                      >
                        <TrashIcon className="-mr-1 h-5 w-5" />
                      </span>
                    </span>
                  </TableBodyRowData>
                </TableBodyRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <DeleteEntry
        id={idToDelete.current}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  );
};
