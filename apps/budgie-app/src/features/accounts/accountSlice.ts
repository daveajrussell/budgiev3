import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccountDto as AccountDto } from './Accounts';
import { RootState } from '../../app/store';
import { createAppSelector } from '../../app/hooks';
import { Account, AccountType } from 'budgie-core';

const initialState: AccountsState = {
  accounts: [],
  error: null,
  status: 'idle',
};

export interface AccountsState {
  accounts: AccountDto[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

export const fetchAccounts = createAsyncThunk<AccountDto[]>(
  'accounts/fetchAccounts',
  async () => {
    const response = await fetch('/api/accounts');
    const values = (await response.json()) as Account[];
    return values.map((value) => {
      return {
        id: value.id,
        name: value.name,
        amount: value.amount,
        typeName: AccountType[value.type],
        type: value.type,
        color: value.color,
      } as AccountDto;
    });
  },
);

export const editAccount = createAsyncThunk<AccountDto, AccountDto>(
  'accounts/editAccount',
  async (accountDto: AccountDto, { rejectWithValue }) => {
    try {
      const isNew = !accountDto.id;
      const method = isNew ? 'POST' : 'PUT';
      const response = await fetch('/api/accounts', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: accountDto.id,
          name: accountDto.name,
          amount: accountDto.amount,
          type: accountDto.type,
          color: accountDto.color,
        } as Account),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      if (isNew) {
        const account = await response.json();
        return {
          id: account.id,
          name: account.name,
          amount: account.amount,
          color: account.color,
          type: account.type,
          typeName: AccountType[account.type],
        } as AccountDto;
      } else {
        return accountDto;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteAccount = createAsyncThunk<number, number>(
  'accounts/deleteAccount',
  async (id: number, { rejectWithValue }) => {
    try {
      await fetch('/api/accounts/' + id, {
        method: 'DELETE',
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editAccount.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(editAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idx = state.accounts.findIndex((c) => c.id === action.payload.id);
        if (idx >= 0) {
          state.accounts = state.accounts.map((account, index) =>
            index === idx ? action.payload : account,
          );
        } else {
          state.accounts.push(action.payload);
        }
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idx = state.accounts.findIndex((x) => x.id === action.payload);
        if (idx >= 0) state.accounts.splice(idx, 1);
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default accountSlice.reducer;

export const selectAllAccounts = (state: RootState): AccountDto[] =>
  state.account.accounts;

export const selectAccount = createAppSelector(
  (rootState) => rootState.account.accounts,
  (_, id: number) => id,
  (accounts: AccountDto[], id) =>
    accounts.find((account) => account.id === id) ??
    ({
      name: '',
      type: AccountType.Income,
      typeName: AccountType[AccountType.Income],
      amount: 0,
      color: '',
    } as AccountDto),
);
