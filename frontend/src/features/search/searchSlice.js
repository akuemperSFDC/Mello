import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBoardsSearchAsync = createAsyncThunk(
  'search/getBoardsSearchAsync',
  async (search, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/search/boards`,
        { search },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListsSearchAsync = createAsyncThunk(
  'search/getListsSearchAsync',
  async (search, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/search/lists`,
        { search },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCardsSearchAsync = createAsyncThunk(
  'search/getCardsSearchAsync',
  async (search, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/search/cards`,
        { search },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: 'lists',
  initialState: {
    loading: false,
    boardResults: [],
    listResults: [],
    cardResults: [],
  },
  reducers: {},
  extraReducers: {
    // Get boards from search
    [getBoardsSearchAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.boardResults = action.payload.boards && action.payload.boards;
      delete state.errors;
    },
    [getBoardsSearchAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getBoardsSearchAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Get lists from search
    [getListsSearchAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.listResults = action.payload.lists && action.payload.lists;
      delete state.errors;
    },
    [getListsSearchAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getListsSearchAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Get cards from search
    [getCardsSearchAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.cardResults = action.payload.cards && action.payload.cards;
      delete state.errors;
    },
    [getCardsSearchAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getCardsSearchAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

// export const {} = slice.actions;

export default slice.reducer;
