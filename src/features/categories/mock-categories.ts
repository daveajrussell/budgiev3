import { types } from "../../types/category-types";
import { Category } from "./Categories";

export const mockCategories: Category[] = [
  {
    id: "hIjQDqnys0u56AVg9lCuE",
    name: "Salary",
    type: types.income,
    amount: 2000,
  },
  {
    id: "XcJxCc63LJxDS2v2lWW3N",
    name: "Bonus",
    type: types.income,
    amount: 100,
  },
  {
    id: "J68UtoThx2kcjabd1OUS9",
    name: "Groceries",
    type: types.expense,
    amount: 200,
  },
];
