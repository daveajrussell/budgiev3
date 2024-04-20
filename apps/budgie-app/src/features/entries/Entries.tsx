import { Outlet } from 'react-router-dom';
import { TableRowValue } from '../../types/table-row-value';

export type EntryDto = {
  [key: string]: TableRowValue;
  id: number;
  date: string;
  accountId: number;
  amount: number;
};

export const Entries = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
