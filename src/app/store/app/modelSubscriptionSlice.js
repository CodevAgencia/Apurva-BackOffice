import { createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from '../fuse/messageSlice';
import modelSubscriptionService from '../../services/apiService/modelSubscriptionService';

export const getModelSuscriptions = createAsyncThunk(
  'models/getModelSuscriptions',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Modelos cargados correctamente.',
          variant: 'success',
        })
      );
      return await modelSubscriptionService.getModelSubscription(id);
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener los Modelos.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const saveModelSuscriptions = createAsyncThunk(
  'models/saveModelSuscriptions',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const newModel = await modelSubscriptionService.saveModelSubscription(data);
      dispatch(
        showMessage({
          message: 'Modelos guardar correctamente.',
          variant: 'success',
        })
      );
      // TODO: FALTA CERRAR EL DIALOG CUANDO TERMINE DE AGREGAR A TODOS LOS MODELOS
      return newModel;
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
