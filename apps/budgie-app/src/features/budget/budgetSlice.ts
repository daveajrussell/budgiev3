import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BudgetEntryDto } from './Budget';
import { RootState } from '../../app/store';
import { createAppSelector } from '../../app/hooks';
import formatDate from '../../helpers/dates';
import { BudgetEntry } from 'budgie-core';

const initialState: BudgetEntriesState = {
  entries: [],
  error: null,
  status: 'idle',
};

export interface BudgetEntriesState {
  entries: BudgetEntryDto[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

export const fetchBudgetEntries = createAsyncThunk<BudgetEntryDto[]>(
  'entries/fetchEntries',
  async () => {
    const response = await fetch('/api/budget-entries');
    const values = (await response.json()) as BudgetEntry[];
    return values.map((value) => {
      return {
        id: value.id,
        categoryId: value.categoryId,
        date: formatDate(new Date(value.date)),
        amount: value.amount,
      } as BudgetEntryDto;
    });
  },
);

export const editEntry = createAsyncThunk<BudgetEntryDto, BudgetEntryDto>(
  'entries/editEntry',
  async (budgetEntryDto: BudgetEntryDto, { rejectWithValue }) => {
    try {
      const isNew = !budgetEntryDto.id;
      const method = isNew ? 'POST' : 'PUT';
      const response = await fetch('/api/budget-entries', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: budgetEntryDto.id,
          categoryId: budgetEntryDto.categoryId,
          date: new Date(budgetEntryDto.date),
          amount: budgetEntryDto.amount,
        } as BudgetEntry),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      if (isNew) {
        const budgetEntry = (await response.json()) as BudgetEntry;
        return {
          id: budgetEntry.id,
          categoryId: budgetEntry.categoryId,
          date: formatDate(new Date(budgetEntry.date)),
          amount: budgetEntry.amount,
        } as BudgetEntryDto;
      } else {
        return budgetEntryDto;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteEntry = createAsyncThunk<number, number>(
  'entries/deleteEntry',
  async (id: number, { rejectWithValue }) => {
    try {
      await fetch('/api/budget-entries/' + id, {
        method: 'DELETE',
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgetEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBudgetEntries.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchBudgetEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(editEntry.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(editEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idx = state.entries.findIndex((c) => c.id === action.payload.id);
        if (idx >= 0) {
          state.entries = state.entries.map((entry, index) =>
            index === idx ? action.payload : entry,
          );
        } else {
          state.entries.push(action.payload);
        }
      })
      .addCase(deleteEntry.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idx = state.entries.findIndex((x) => x.id === action.payload);
        if (idx >= 0) state.entries.splice(idx, 1);
      });
  },
});

export default budgetSlice.reducer;

export const selectEntries = (state: RootState): BudgetEntryDto[] =>
  state.budget.entries;

export const selectEntry = createAppSelector(
  (rootState) => rootState.budget.entries,
  (_, id: number | undefined) => id,
  (entries: BudgetEntryDto[], id) =>
    entries.find((entry) => entry.id === id) ?? {
      categoryId: 1,
      date: formatDate(),
      amount: 0,
    },
);
