import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "./Categories";
import { mockCategories } from "./mock-categories";
import { RootState } from "../../app/store";
import { createAppSelector } from "../../app/hooks";
import { types } from "../../types/category-types";

const initialState: CategoriesState = { categories: mockCategories };

export interface CategoriesState {
  categories: Category[];
}

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    editCategory: (state, action: PayloadAction<Category>) => {
      const idx = state.categories.findIndex((c) => c.id === action.payload.id);
      if (idx >= 0) {
        const category = state.categories[idx];
        category.name = action.payload.name;
        category.type = action.payload.type;
        category.amount = action.payload.amount;
        category.color = action.payload.color;
      } else {
        state.categories.push(action.payload);
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      const idx = state.categories.findIndex((x) => x.id === action.payload);
      if (idx >= 0) state.categories.splice(idx, 1);
    },
  },
});

export const { editCategory, deleteCategory } = categorySlice.actions;

export default categorySlice.reducer;

export const selectCategories = (state: RootState): Category[] =>
  state.category.categories;

export const selectCategory = createAppSelector(
  (rootState) => rootState.category.categories,
  (_, id: string | undefined) => id,
  (categories: Category[], id) =>
    categories.find((category) => category.id === id) ?? {
      name: "",
      type: types.expense,
      amount: 0,
      color: "",
    }
);
