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

export const fetchCategories = createAsyncThunk<CategoryDto[]>(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('/api/categories');
    const values = (await response.json()) as Category[];
    return values.map((value) => {
      return {
        id: value.id,
        name: value.name,
        amount: value.amount,
        typeName: CategoryType[value.type],
        type: value.type,
        color: value.color,
      } as CategoryDto;
    });
  },
);

export const editCategory = createAsyncThunk<CategoryDto, CategoryDto>(
  'categories/editCategory',
  async (categoryDto: CategoryDto, { rejectWithValue }) => {
    try {
      const isNew = !categoryDto.id;
      const method = isNew ? 'POST' : 'PUT';
      const response = await fetch('/api/categories', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: categoryDto.id,
          name: categoryDto.name,
          amount: categoryDto.amount,
          type: categoryDto.type,
          color: categoryDto.color,
        } as Category),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      if (isNew) {
        const category = await response.json();
        return {
          id: category.id,
          name: category.name,
          amount: category.amount,
          color: category.color,
          type: category.type,
          typeName: CategoryType[category.type],
        } as CategoryDto;
      } else {
        return categoryDto;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCategory = createAsyncThunk<number, number>(
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
  extraReducers: (builder) => {
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
          state.categories = state.categories.map((category, index) =>
            index === idx ? action.payload : category,
          );
        } else {
          state.categories.push(action.payload);
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
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
    ({
      name: '',
      type: CategoryType.Income,
      typeName: CategoryType[CategoryType.Income],
      amount: 0,
      color: '',
    } as CategoryDto),
);
