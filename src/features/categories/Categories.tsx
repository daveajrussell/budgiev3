import { Outlet } from "react-router-dom";

export const types = {
  income: "Income",
  expense: "Expense",
};
export type TableRowValue = string | number;
export type Category = {
  [key: string]: TableRowValue;
  id: string;
  name: TableRowValue;
  type: TableRowValue;
};

export const Categories = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
