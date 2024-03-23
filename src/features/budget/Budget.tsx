import { Outlet } from "react-router-dom";

export type BudgetEntry = {
  id: string;
  date: Date;
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
