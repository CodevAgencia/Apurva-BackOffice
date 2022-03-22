import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../fuse/messageSlice';
import blogService from '../../services/apiService/blogService';

export const getBlogsCategories = createAsyncThunk(
  'blogs/getBlogsCategories',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Categorias cargados correctamente.',
          variant: 'success',
        })
      );
      return await blogService.getCategoriesBlog();
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener las Categorias.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const categoryAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoriesById } =
  categoryAdapter.getSelectors((state) => state.categories);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoryAdapter.getInitialState({
    searchText: '',
    errors: {},
    loading: false,
    infoBlog: null,
    filter: 0,
  }),
  reducers: {
    setCategorieSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getBlogsCategories.pending]: (state) => {
      state.loading = true;
    },
    [getBlogsCategories.fulfilled]: (state, action) => {
      state.loading = false;
      categoryAdapter.setAll(state, action.payload);
    },
    [getBlogsCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setCategorieSearchText } = categoriesSlice.actions;

export default categoriesSlice.reducer;
