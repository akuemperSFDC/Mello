import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getListsAsync = createAsyncThunk(
  'lists/getListsAsync',
  async (boardId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/lists/board/${boardId}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCardAsync = createAsyncThunk(
  'cards/createCardAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, title } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/cards/list/${id}`,
        { title },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createListAsync = createAsyncThunk(
  'lists/createListAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, title } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/lists/board/${id}`,
        { title },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editListAsync = createAsyncThunk(
  'lists/editListAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, title } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/lists/${id}`,
        { title },
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
  initialState: { loading: false, currentLists: [], currentList: {} },
  reducers: {
    currentList: (state, action) => {
      state.currentList = action.payload;
    },
  },
  extraReducers: {
    // Get lists
    [getListsAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const normalizedLists = {};
      action.payload.forEach((list) => {
        normalizedLists[list._id] = list;
      });
      state.currentLists = normalizedLists;
      delete state.errors;
    },
    [getListsAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getListsAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Create list
    [createListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists[action.payload._id] = action.payload;
      state.newList = action.payload;
      delete state.errors;
    },
    [createListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [createListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Edit list
    [editListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists[action.payload._id] = action.payload;
      state.editedList = action.payload;
      delete state.errors;
    },
    [editListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [editListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Create card
    [createCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const listId = action.payload.list;
      state.currentLists[listId].cards.push(action.payload);
      delete state.errors;
    },
    [createCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [createCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

export const { currentList } = slice.actions;

export default slice.reducer;
