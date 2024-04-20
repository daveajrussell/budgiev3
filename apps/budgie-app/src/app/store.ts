import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../features/accounts/accountSlice';
import entryReducer from '../features/entries/entriesSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,
    entry: entryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
