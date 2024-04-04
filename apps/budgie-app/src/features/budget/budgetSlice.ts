import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BudgetEntry } from './Budget';
import { RootState } from '../../app/store';
import { createAppSelector } from '../../app/hooks';
import formatDate from '../../helpers/dates';

const initialState: BudgetEntriesState = { entries: [] };

export interface BudgetEntriesState {
  entries: BudgetEntry[];
}

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: initialState,
  reducers: {
    editEntry: (state, action: PayloadAction<BudgetEntry>) => {
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
    deleteEntry: (state, action: PayloadAction<number>) => {
      const idx = state.entries.findIndex((x) => x.id === action.payload);
      if (idx >= 0) state.entries.splice(idx, 1);
    },
  },
});

export const { editEntry, deleteEntry } = budgetSlice.actions;

export default budgetSlice.reducer;

export const selectEntries = (state: RootState): BudgetEntry[] =>
  state.budget.entries;

export const selectEntry = createAppSelector(
  (rootState) => rootState.budget.entries,
  (_, id: number | undefined) => id,
  (entries: BudgetEntry[], id) =>
    entries.find((entry) => entry.id === id) ?? {
      categoryId: 0,
      date: formatDate(),
      amount: 0,
    },
);
