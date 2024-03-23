import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BudgetEntry } from "./Budget";

const initialState: BudgetEntriesState = { entries: [] };

export interface BudgetEntriesState {
  entries: BudgetEntry[];
}

export const budgetSlice = createSlice({
  name: "budget",
  initialState: initialState,
  reducers: {
    editEntry: (state, action: PayloadAction<BudgetEntry>) => {
      console.log(state, action);
      const idx = state.entries.findIndex((c) => c.id === action.payload.id);
      if (idx >= 0) {
        const entry = state.entries[idx];
        entry.date = action.payload.date;
        entry.categoryId = action.payload.categoryId;
        entry.amount = action.payload.amount;
      } else {
        state.entries.push(action.payload);
      }
    },
  },
});
