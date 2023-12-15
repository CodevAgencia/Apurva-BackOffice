import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import textosService from '../../services/apiService/textosService';
import { showMessage } from '../fuse/messageSlice';

export const getTexts = createAsyncThunk(
  'texts/getTexts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Textos cargados correctamente.',
          variant: 'success',
        })
      );
      return await textosService.getTexts();
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener los textos.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateText = createAsyncThunk(
  'texts/updateText',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const updateData = await textosService.updateText(data);
      dispatch(
        showMessage({
          message: 'Textos actualizados correctamente.',
          variant: 'success',
        })
      );
      return updateData;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al actualizar los textos.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const textsAdapter = createEntityAdapter({});

export const { selectAll: selectTexts, selectById: selectTextsById } = textsAdapter.getSelectors(
  (state) => state.texts
);

const textsSlice = createSlice({
  name: 'texts',
  initialState: textsAdapter.getInitialState({
    texts: [],
    errors: {},
    loading: false,
    filter: 0,
  }),
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getTexts.pending]: (state) => {
      state.loading = true;
    },
    [getTexts.fulfilled]: (state, action) => {
      state.loading = false;
      textsAdapter.setAll(state, action.payload);
    },
    [getTexts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateText.pending]: (state) => {
      state.loading = true;
    },
    [updateText.fulfilled]: (state, action) => {
      state.loading = false;
      textsAdapter.upsertOne(state, action.payload);
    },
    [updateText.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setFilter } = textsSlice.actions;

export default textsSlice.reducer;
