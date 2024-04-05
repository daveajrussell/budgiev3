import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CategoryDto } from './Categories';
import { RootState } from '../../app/store';
import { createAppSelector } from '../../app/hooks';
import { Category, CategoryType } from 'budgie-core';

const initialState: CategoriesState = {
  categories: [],
  error: null,
  status: 'idle',
};

export interface CategoriesState {
  categories: CategoryDto[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('/api/categories');
    const values = (await response.json()) as Category[];
    return values.map((value) => {
      return <CategoryDto>{
        id: value.id,
        name: value.name,
        amount: value.amount,
        typeName: CategoryType[value.type],
        typeValue: value.type,
        color: value.color,
      };
    });
  },
);

export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async (category: CategoryDto, { rejectWithValue }) => {
    try {
      const isNew = !category.id;
      const method = isNew ? 'POST' : 'PUT';
      const response = await fetch('/api/categories', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(<Category>{
          id: category.id,
          name: category.name,
          amount: category.amount,
          type: category.typeValue,
          color: category.color,
        }),
      });
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      return isNew ? await response.json() : category;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: number, { rejectWithValue }) => {
    try {
      await fetch('/api/categories/' + id, {
        method: 'DELETE',
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(editCategory.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idx = state.categories.findIndex(
          (c) => c.id === action.payload.id,
        );
        if (idx >= 0) {
          const category = state.categories[idx];
          category.name = action.payload.name;
          category.typeValue = action.payload.typeValue;
          category.typeName = CategoryType[action.payload.typeValue];
          category.amount = action.payload.amount;
          category.color = action.payload.color;
        } else {
          state.categories.push(action.payload);
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const idx = state.categories.findIndex((x) => x.id === action.payload);
        if (idx >= 0) state.categories.splice(idx, 1);
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default categorySlice.reducer;

export const selectAllCategories = (state: RootState): CategoryDto[] =>
  state.category.categories;

export const selectCategory = createAppSelector(
  (rootState) => rootState.category.categories,
  (_, id: number) => id,
  (categories: CategoryDto[], id) =>
    categories.find((category) => category.id === id) ??
    <CategoryDto>{
      name: '',
      typeValue: CategoryType.Income,
      typeName: CategoryType[CategoryType.Income],
      amount: 0,
      color: '',
    },
);
