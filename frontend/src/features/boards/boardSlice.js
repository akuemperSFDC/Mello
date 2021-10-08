import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async (_, { getState, rejectWithValue }) => {
    try {
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

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const boardSlice = createSlice({
  name: 'boards',
  initialState: { loading: false },
  reducers: {},
  extraReducers: {
    [getBoardsAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.boards = action.payload;
      delete state.errors;
    },
    [getBoardsAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload.errors;
    },
    [getBoardsAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

export default boardSlice.reducer;
