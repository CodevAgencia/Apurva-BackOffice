import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../fuse/messageSlice';
import blogService from '../../services/apiService/blogService';
import { closeDialog } from '../fuse/dialogSlice';

export const getBlogs = createAsyncThunk(
  'blogs/getBlogs',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Blogs cargados correctamente.',
          variant: 'success',
        })
      );
      return await blogService.getBlogs();
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener los Blogs.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const saveBlog = createAsyncThunk(
  'blogs/saveBlog',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const newBlog = await blogService.saveBlog(data);
      dispatch(
        showMessage({
          message: 'Blog creado correctamente',
          variant: 'success',
        })
      );
      dispatch(closeDialog());
      return newBlog;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al crear el Blog.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const user = await blogService.updateBlog(data);
      dispatch(
        showMessage({
          message: 'Blog actualizado correctamente',
          variant: 'success',
        })
      );
      dispatch(closeDialog());
      return user;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al actualizar el Blog.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateStateBlog = createAsyncThunk(
  'blogs/updateStateBlog',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const updateData = await blogService.changeStateBlog(data);
      dispatch(
        showMessage({
          message: 'Blog actualizado correctamente.',
          variant: 'success',
        })
      );
      // history.go(0);
      return updateData;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al actualizar al Blog.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const blogsAdapter = createEntityAdapter({});

export const { selectAll: selectBlogs, selectById: selectBlogsById } = blogsAdapter.getSelectors(
  (state) => state.blogs
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState: blogsAdapter.getInitialState({
    searchText: '',
    errors: {},
    loading: false,
    infoBlog: null,
    filter: 0,
  }),
  reducers: {
    setBlogSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setInfoBlog: (state, action) => {
      state.infoBlog = action.payload;
    },
    restarInfoBlog: (state) => {
      state.infoBlog = null;
    },
    setFilterBlog: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getBlogs.pending]: (state) => {
      state.loading = true;
    },
    [getBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      blogsAdapter.setAll(state, action.payload);
    },
    [getBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [saveBlog.pending]: (state) => {
      state.loading = true;
    },
    [saveBlog.fulfilled]: (state, action) => {
      state.loading = false;
      blogsAdapter.addOne(state, action.payload);
    },
    [saveBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateStateBlog.pending]: (state) => {
      state.loading = true;
    },
    [updateStateBlog.fulfilled]: (state, action) => {
      state.loading = false;
      blogsAdapter.upsertOne(state, action.payload);
    },
    [updateStateBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateBlog.pending]: (state) => {
      state.loading = true;
    },
    [updateBlog.fulfilled]: (state, action) => {
      state.loading = false;
      blogsAdapter.upsertOne(state, action.payload);
    },
    [updateBlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setBlogSearchText, setInfoBlog, restarInfoBlog, setFilterBlog } = blogSlice.actions;

export default blogSlice.reducer;
