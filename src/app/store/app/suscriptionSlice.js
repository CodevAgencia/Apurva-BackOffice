import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../fuse/messageSlice';
import suscriptionService from '../../services/apiService/suscripcionService';

export const getSuscriptions = createAsyncThunk(
  'suscriptions/getSuscriptions',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Suscripciones cargadas correctamente.',
          variant: 'success',
        })
      );
      return await suscriptionService.getSuscriptions();
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener las Suscripciones.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const suscriptionsAdapter = createEntityAdapter({});

export const { selectAll: selectSuscriptions, selectById: selectSuscriptionsById } =
  suscriptionsAdapter.getSelectors((state) => state.suscriptions);

const suscriptionSlice = createSlice({
  name: 'suscriptions',
  initialState: suscriptionsAdapter.getInitialState({
    searchText: '',
    errors: {},
    loading: false,
    infoSuscription: null,
    filter: 0,
  }),
  reducers: {
    // setBlogSearchText: {
    //   reducer: (state, action) => {
    //     state.searchText = action.payload;
    //   },
    //   prepare: (event) => ({ payload: event.target.value || '' }),
    // },
    // setInfoBlog: (state, action) => {
    //   state.infoBlog = action.payload;
    // },
    // restarInfoBlog: (state) => {
    //   state.infoBlog = null;
    // },
    // setFilterBlog: (state, action) => {
    //   state.filter = action.payload;
    // },
  },
  extraReducers: {
    [getSuscriptions.pending]: (state) => {
      state.loading = true;
    },
    [getSuscriptions.fulfilled]: (state, action) => {
      state.loading = false;
      suscriptionsAdapter.setAll(state, action.payload);
    },
    [getSuscriptions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // [saveBlog.pending]: (state) => {
    //   state.loading = true;
    // },
    // [saveBlog.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   blogsAdapter.addOne(state, action.payload);
    // },
    // [saveBlog.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // [updateStateBlog.pending]: (state) => {
    //   state.loading = true;
    // },
    // [updateStateBlog.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   blogsAdapter.upsertOne(state, action.payload);
    // },
    // [updateStateBlog.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // [updateBlog.pending]: (state) => {
    //   state.loading = true;
    // },
    // [updateBlog.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   blogsAdapter.upsertOne(state, action.payload);
    // },
    // [updateBlog.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
});

// export const { setBlogSearchText, setInfoBlog, restarInfoBlog, setFilterBlog } = blogSlice.actions;

export default suscriptionSlice.reducer;
