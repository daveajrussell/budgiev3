import { Outlet } from 'react-router-dom';
import { TableRowValue } from '../../types/table-row-value';

export type BudgetEntryDto = {
  [key: string]: TableRowValue;
  id: number;
  date: string;
  categoryId: number;
  amount: number;
};

export const Budget = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
