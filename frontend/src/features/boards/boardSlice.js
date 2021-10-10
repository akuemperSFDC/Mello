import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

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

export const createBoardAsync = createAsyncThunk(
  'boards/createBoardAsync',
  async (title, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/boards',
        { title },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editBoardAsync = createAsyncThunk(
  'boards/editBoardAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { title, favorite, id } = params;
      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/boards/${id}`,
        { title, favorite },
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
  initialState: { loading: false, currentBoard: null },
  reducers: {
    currentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: {
    [getBoardsAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.boards = action.payload;
      delete state.errors;
    },
    [getBoardsAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getBoardsAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
    [createBoardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.boards.push(action.payload.data);
      state.newBoard = action.payload;
      delete state.errors;
    },
    [createBoardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [createBoardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

export const { currentBoard } = boardSlice.actions;

export default boardSlice.reducer;
