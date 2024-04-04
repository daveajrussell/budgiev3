import { Outlet } from 'react-router-dom';
import { TableRowValue } from '../../types/table-row-value';

export type Category = {
  [key: string]: TableRowValue | undefined;
  id: number | undefined;
  name: TableRowValue;
  type: TableRowValue;
  amount: number;
  color: string;
};

export const Categories = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
