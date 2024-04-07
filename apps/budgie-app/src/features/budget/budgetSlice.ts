import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BudgetEntryDto } from './Budget';
import { RootState } from '../../app/store';
import { createAppSelector } from '../../app/hooks';
import formatDate from '../../helpers/dates';

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
    return [];
  },
);

export const editEntry = createAsyncThunk<BudgetEntryDto, BudgetEntryDto>(
  'entries/editEntry',
  async (budgetEntryDto: BudgetEntryDto) => {
    return budgetEntryDto;
  },
);

export const deleteEntry = createAsyncThunk<number, number>(
  'entries/deleteEntry',
  async (id: number) => {
    return id;
  },
);

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
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
