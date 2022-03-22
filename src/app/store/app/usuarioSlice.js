import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import usuarioService from '../../services/apiService/usarioService';
import { showMessage } from '../fuse/messageSlice';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        showMessage({
          message: 'Usuarios cargados correctamente.',
          variant: 'success',
        })
      );
      return await usuarioService.getUsers();
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al obtener los usuarios.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateStateUsers = createAsyncThunk(
  'users/updateStateUsers',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const updateData = await usuarioService.updateStateUser(data);
      dispatch(
        showMessage({
          message: 'Usuario actualizado correctamente.',
          variant: 'success',
        })
      );
      // history.go(0);
      return updateData;
    } catch (error) {
      dispatch(
        showMessage({
          message: 'Error al actualizar al usuario.',
          variant: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(
  (state) => state.users
);

const usuarioSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
    errors: {},
    loading: false,
    infoUser: null,
    filter: 0,
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setInfoUser: (state, action) => {
      state.infoUser = action.payload;
    },
    restarInfoUser: (state) => {
      state.infoUser = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      usersAdapter.setAll(state, action.payload);
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateStateUsers.pending]: (state) => {
      state.loading = true;
    },
    [updateStateUsers.fulfilled]: (state, action) => {
      state.loading = false;
      usersAdapter.upsertOne(state, action.payload);
    },
    [updateStateUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUsersSearchText, setInfoUser, restarInfoUser, setFilter } = usuarioSlice.actions;

export default usuarioSlice.reducer;
