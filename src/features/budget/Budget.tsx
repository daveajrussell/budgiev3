import { Outlet } from "react-router-dom";
import { TableRowValue } from "../../types/table-row-value";

export type BudgetEntry = {
  [key: string]: TableRowValue;
  id: string;
  date: string;
  categoryId: string;
  amount: number;
};

export const Budget = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
