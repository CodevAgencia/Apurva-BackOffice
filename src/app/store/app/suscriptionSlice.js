import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../fuse/messageSlice';
import suscriptionService from '../../services/apiService/suscripcionService';
import { closeDialog } from '../fuse/dialogSlice';

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

export const saveSuscription = createAsyncThunk(
  'suscriptions/saveSuscription',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const newSuscription = await suscriptionService.saveSuscription(data);
      dispatch(
        showMessage({
          message: 'Suscripcion creada correctamente',
          variant: 'success',
        })
      );
      dispatch(closeDialog());
      return newSuscription;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al crear la Suscripción.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateSuscription = createAsyncThunk(
  'suscriptions/updateSuscription',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const updateData = await suscriptionService.updateSuscription(data);
      dispatch(
        showMessage({
          message: 'Suscripción actualizado correctamente.',
          variant: 'success',
        })
      );
      dispatch(closeDialog());
      return updateData;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al actualizar la Suscripción.',
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
    setSuscriptionSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setInfoSuscription: (state, action) => {
      state.infoSuscription = action.payload;
    },
    restarInfoSuscription: (state) => {
      state.infoSuscription = null;
    },
    setFilterStateSuscription: (state, action) => {
      state.filter = action.payload;
    },
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
    [getSuscriptionsTypes.fulfilled]: (state, action) => {
      state.loading = false;
      state.types = action.payload;
    },
    [getSuscriptionsTypes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getSuscriptionsLevels.fulfilled]: (state, action) => {
      state.loading = false;
      state.levels = action.payload;
    },
    [getSuscriptionsLevels.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [saveSuscription.pending]: (state) => {
      state.loading = true;
    },
    [saveSuscription.fulfilled]: (state, action) => {
      state.loading = false;
      suscriptionsAdapter.addOne(state, action.payload);
    },
    [saveSuscription.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateSuscription.pending]: (state) => {
      state.loading = true;
    },
    [updateSuscription.fulfilled]: (state, action) => {
      state.loading = false;
      suscriptionsAdapter.upsertOne(state, action.payload);
    },
    [updateSuscription.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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

export const {
  setSuscriptionSearchText,
  setFilterStateSuscription,
  setInfoSuscription,
  restarInfoSuscription,
} = suscriptionSlice.actions;

export default suscriptionSlice.reducer;
