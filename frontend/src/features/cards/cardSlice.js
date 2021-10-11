import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCardsAsync = createAsyncThunk(
  'cards/getCardsAsync',
  async (listId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/cards/list/${listId}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: 'cards',
  initialState: { loading: false, currentCards: [] },
  reducers: {},
  extraReducers: {
    [getCardsAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentCards = action.payload;
      delete state.errors;
    },
    [getCardsAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getCardsAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

// export const {} = slice.actions;

export default slice.reducer;
