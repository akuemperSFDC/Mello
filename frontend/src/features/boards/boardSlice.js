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
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { backgroundImage, title } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/boards',
        { title, backgroundImage },
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
      const { title, favorite, id, description, backgroundImage } = params;
      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/boards/${id}`,
        { title, favorite, description, backgroundImage },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBoardAsync = createAsyncThunk(
  'boards/deleteBoardAsync',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:5000/api/boards/${id}`,
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
  initialState: {
    loading: false,
    currentBoard: {},
    starredBoards: {},
    boards: {},
  },
  reducers: {
    currentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    clearCurrentBoard: (state, action) => {
      state.currentBoard = { loading: false, currentBoard: null };
    },
  },
  extraReducers: {
    // Get boards
    [getBoardsAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const normalizedBoards = {};
      action.payload.forEach((board) => {
        normalizedBoards[board._id] = board;
      });
      const normalizeStarredBoards = {};
      const starredBoards = action.payload.filter(
        (board) => board.favorite === true
      );
      starredBoards.forEach((board) => {
        normalizeStarredBoards[board._id] = board;
      });
      state.starredBoards = normalizeStarredBoards;
      state.boards = normalizedBoards;
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

    // Create board
    [createBoardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.boards[action.payload._id] = action.payload;
      state.currentBoard = action.payload;
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

    // Edit board
    [editBoardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.boards[action.payload._id] = action.payload;
      action.payload.favorite === true
        ? (state.starredBoards[action.payload._id] = action.payload)
        : delete state.starredBoards[action.payload._id];

      state.currentBoard = action.payload;
      delete state.errors;
    },
    [editBoardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [editBoardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Delete board
    [deleteBoardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      console.log(action.payload);
      delete state.boards[action.payload.id];
      state.currentBoard = {};
      delete state.errors;
    },
    [deleteBoardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [deleteBoardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

export const { currentBoard, clearCurrentBoard, starredBoards } =
  boardSlice.actions;

export default boardSlice.reducer;
