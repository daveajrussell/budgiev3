import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categories/categorySlice";
import budgetReducer from "../features/budget/budgetSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    budget: budgetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
