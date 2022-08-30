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

/* tipos y niveles para suscripciones */
export const getSuscriptionsTypes = createAsyncThunk(
  'suscriptions/getSuscriptionsTypes',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Tipos cargados correctamente.',
          variant: 'success',
        })
      );
      return await suscriptionService.getTypesSuscriptions();
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener los Tipos.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const getSuscriptionsLevels = createAsyncThunk(
  'suscriptions/getSuscriptionsLevels',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Niveles cargados correctamente.',
          variant: 'success',
        })
      );
      return await suscriptionService.getLevelsSuscriptions();
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener los Niveles.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const suscriptionsAdapter = createEntityAdapter({});

export const { selectAll: selectSuscriptions, selectById: selectSuscriptionsById } =
  suscriptionsAdapter.getSelectors((state) => state.suscripciones);

const suscriptionSlice = createSlice({
  name: 'suscriptions',
  initialState: suscriptionsAdapter.getInitialState({
    types: [],
    levels: [],
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
      console.log('SUSCRIPTIONS ->: ', action.payload);
    },
    [getSuscriptions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getSuscriptionsTypes.fulfilled]: (state, action) => {
      state.loading = false;
      state.types = action.payload;
      console.log('TYPES ->: ', action.payload);
    },
    [getSuscriptionsTypes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getSuscriptionsLevels.fulfilled]: (state, action) => {
      state.loading = false;
      state.levels = action.payload;
      console.log('LEVELS ->: ', action.payload);
    },
    [getSuscriptionsLevels.rejected]: (state, action) => {
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
