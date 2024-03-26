import { Outlet } from "react-router-dom";
import { TableRowValue } from "../../types/table-row-value";

export type Category = {
  [key: string]: TableRowValue;
  id: string;
  name: TableRowValue;
  type: TableRowValue;
  amount: number;
};

export const Categories = () => {
  return (
    <>
      <Outlet></Outlet>
    </>
  );
};
