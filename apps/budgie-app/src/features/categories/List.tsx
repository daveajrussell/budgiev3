import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/20/solid';
import { NavLink } from 'react-router-dom';
import { CategoryDto } from './Categories';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/Button';
import { Delete } from './Delete';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategories, selectAllCategories } from './categorySlice';
import {
  Table,
  TableHeaderRow,
  TableHeaderRowData,
  TableBody,
  TableBodyRow,
  TableBodyRowData,
} from '../../components/table/Table';
import { CategoryType } from 'budgie-core';

export const List = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((rootState) =>
    selectAllCategories(rootState),
  );

  const categoriesStatus = useAppSelector((state) => state.category.status);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  const [isOpen, setIsOpen] = useState(false);
  const idToDelete = useRef(0);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="py-2">Categories</h1>
        <NavLink to="new">
          <Button text="Add new" type="button" color="secondary" />
        </NavLink>
      </div>

      <div className="w-full mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Table>
          <TableHeaderRow>
            <TableHeaderRowData></TableHeaderRowData>
            <TableHeaderRowData>Name</TableHeaderRowData>
            <TableHeaderRowData>Type</TableHeaderRowData>
            <TableHeaderRowData>Amount</TableHeaderRowData>
            <TableHeaderRowData></TableHeaderRowData>
          </TableHeaderRow>
          <TableBody>
            {categories?.map((category: CategoryDto) => {
              return (
                <TableBodyRow key={category.id}>
                  <TableBodyRowData>
                    {category.type === CategoryType.Income ? (
                      <ArrowTrendingUpIcon className="-mr-1 h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowTrendingDownIcon className="-mr-1 h-5 w-5 text-red-500" />
                    )}
                  </TableBodyRowData>
                  <TableBodyRowData>{category.name}</TableBodyRowData>
                  <TableBodyRowData>{category.typeName}</TableBodyRowData>
                  <TableBodyRowData>
                    £{category.amount.toLocaleString()}
                  </TableBodyRowData>
                  <TableBodyRowData>
                    <span className="flex justify-evenly">
                      <NavLink
                        to={category.id?.toString() ?? ''}
                        className=" font-semibold text-gray-900 hover:text-violet-500"
                      >
                        <PencilIcon className="-mr-1 h-5 w-5" />
                      </NavLink>

                      <span
                        className=" font-semibold text-gray-900 hover:text-red-500 cursor-pointer"
                        onClick={() => {
                          idToDelete.current = category.id ?? 0;
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

      <Delete id={idToDelete.current} isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};
