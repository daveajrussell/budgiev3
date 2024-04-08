import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EntryDto as EntryDto } from './Entries';
import { RootState } from '../../app/store';
import { createAppSelector } from '../../app/hooks';
import formatDate from '../../helpers/dates';
import { Entry } from 'budgie-core';

const initialState: EntriesState = {
  entries: [],
  error: null,
  status: 'idle',
};

export interface EntriesState {
  entries: EntryDto[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

export const fetchEntries = createAsyncThunk<EntryDto[]>(
  'entries/fetchEntries',
  async () => {
    const response = await fetch('/api/entries');
    const values = (await response.json()) as Entry[];
    return values.map((value) => {
      return {
        id: value.id,
        categoryId: value.categoryId,
        date: formatDate(new Date(value.date)),
        amount: value.amount,
      } as EntryDto;
    });
  },
);

export const editEntry = createAsyncThunk<EntryDto, EntryDto>(
  'entries/editEntry',
  async (entryDto: EntryDto, { rejectWithValue }) => {
    try {
      const isNew = !entryDto.id;
      const method = isNew ? 'POST' : 'PUT';
      const response = await fetch('/api/entries', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: entryDto.id,
          categoryId: entryDto.categoryId,
          date: new Date(entryDto.date),
          amount: entryDto.amount,
        } as Entry),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      if (isNew) {
        const entry = (await response.json()) as Entry;
        return {
          id: entry.id,
          categoryId: entry.categoryId,
          date: formatDate(new Date(entry.date)),
          amount: entry.amount,
        } as EntryDto;
      } else {
        return entryDto;
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
      await fetch('/api/entries/' + id, {
        method: 'DELETE',
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const entriesSlice = createSlice({
  name: 'entries',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEntries.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
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

export default entriesSlice.reducer;

export const selectEntries = (state: RootState): EntryDto[] =>
  state.entry.entries;

export const selectEntry = createAppSelector(
  (rootState) => rootState.entry.entries,
  (_, id: number | undefined) => id,
  (entries: EntryDto[], id) =>
    entries.find((entry) => entry.id === id) ?? {
      categoryId: 1,
      date: formatDate(),
      amount: 0,
    },
);
