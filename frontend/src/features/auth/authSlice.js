import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUserAsync = createAsyncThunk(
  'auth/loginUserAsync',
  async (credentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        credentials,
        config
      );

      localStorage.setItem('auth', JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = { user: null, token: null, loading: false };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('auth');
      return initialState;
    },
  },
  extraReducers: {
    [loginUserAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload.errors;
    },
    [loginUserAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      delete state.errors;
    },
    [loginUserAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

export const { logout } = slice.actions;

export const selectCurrentUser = (state) => state.auth;

export default slice.reducer;
