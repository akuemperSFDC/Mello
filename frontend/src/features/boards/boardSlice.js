import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async ({ getState }) => {
    const { token } = getState().auth;
    console.log('~ token', token);

    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      'http://localhost:5000/api/boards',
      config
    );

    localStorage.setItem('auth');

    return data;
  }
);

const boardSlice = createSlice({
  name: 'boards',
  initialState: { loading: false },
  reducers: {},
  extraReducers: {
    [getBoardsAsync.fulfilled]: (state, action) => {
      return action.payload;
    },
    [getBoardsAsync.rejected]: (state, action) => {
      return action.payload;
    },
    [getBoardsAsync.pending]: (state, action) => {
      return action.payload;
    },
  },
});

export default boardSlice.reducer;
