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

export const createListAsync = createAsyncThunk(
  'lists/createListAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, title } = params;

      console.log(id);

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

const slice = createSlice({
  name: 'lists',
  initialState: { loading: false, currentLists: [] },
  reducers: {},
  extraReducers: {
    [getListsAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists = action.payload;
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
    [createListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists.push(action.payload.data);
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
  },
});

// export const {} = slice.actions;

export default slice.reducer;
