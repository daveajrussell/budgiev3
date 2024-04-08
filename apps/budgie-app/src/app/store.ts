import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categories/categorySlice';
import entryReducer from '../features/entries/entriesSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    entry: entryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
