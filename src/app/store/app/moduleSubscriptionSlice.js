import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { showMessage } from '../fuse/messageSlice';
import moduleSubscriptionService from '../../services/apiService/moduleSubscriptionService';
import { closeDialog } from '../fuse/dialogSlice';

export const getModulesList = createAsyncThunk(
  'modules/getModulesList',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Módulos cargados correctamente.',
          variant: 'success',
        })
      );
      return await moduleSubscriptionService.getModules();
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener los Módulos.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const getModulesSuscriptions = createAsyncThunk(
  'modules/getModulesSuscriptions',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Módulos cargados correctamente.',
          variant: 'success',
        })
      );
      return await moduleSubscriptionService.getModuleSubscription(id);
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener los Módulos.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const saveModulesSuscriptions = createAsyncThunk(
  'modules/saveModelSuscriptions',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const newModule = await moduleSubscriptionService.saveModuleSubscription(data);
      dispatch(
        showMessage({
          message: 'Modelos guardar correctamente.',
          variant: 'success',
        })
      );
      dispatch(closeDialog());
      return newModule;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al guardar el/los Modelo(s).',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const deleteModulesSuscriptions = createAsyncThunk(
  'modules/deleteModulesSuscriptions',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const deleteModule = await moduleSubscriptionService.deleteModelSubscription(id);
      dispatch(
        showMessage({
          message: 'Modelo(s) eliminado(s) correctamente.',
          variant: 'success',
        })
      );
      dispatch(closeDialog());
      return deleteModule;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al eliminar el/los Modelo(s).',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const modulesAdapter = createEntityAdapter({});

export const { selectAll: selectModules, selectById: selectModulesById } =
  modulesAdapter.getSelectors((state) => state.modules);

const modulesSlice = createSlice({
  name: 'modules',
  initialState: modulesAdapter.getInitialState({
    errors: {},
    loading: false,
    infoModule: null,
  }),
  reducers: {
    setModuleInfo: (state, action) => {
      state.infoModule = action.payload;
    },
    restartModule: (state) => {
      state.infoModule = null;
    },
  },
  extraReducers: {
    [getModulesList.pending]: (state) => {
      state.loading = true;
    },
    [getModulesList.fulfilled]: (state, action) => {
      state.loading = false;
      modulesAdapter.setAll(state, action.payload);
    },
    [getModulesList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getModulesSuscriptions.pending]: (state) => {
      state.loading = true;
    },
    [getModulesSuscriptions.fulfilled]: (state, action) => {
      state.loading = false;
      // TODO: COMPLETAR TRAER LA LISTA DE MODULOS DE LA SUSCRIPCION
      // modulesAdapter.removeAll(state);
      // modulesAdapter.setAll(state, action.payload || []);
    },
    [getModulesSuscriptions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [saveModulesSuscriptions.pending]: (state) => {
      state.loading = true;
    },
    [saveModulesSuscriptions.fulfilled]: (state, action) => {
      state.loading = false;
      modulesAdapter.addOne(state, action.payload);
    },
    [saveModulesSuscriptions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteModulesSuscriptions.pending]: (state) => {
      state.loading = true;
    },
    [deleteModulesSuscriptions.fulfilled]: (state, action) => {
      state.loading = false;
      modulesAdapter.removeOne(state, action.payload);
    },
    [deleteModulesSuscriptions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setModuleInfo, restartModule } = modulesSlice.actions;

export default modulesSlice.reducer;
