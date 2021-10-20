import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* ------------------------------ Get activities by board id ------------------------------ */

export const getActivitiesByBoardAsync = createAsyncThunk(
  'activities/getActivitiesByBoardAsync',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/activities/${id}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: 'activities',
  initialState: {
    loading: false,
    currentBoardActivities: [],
  },
  reducers: {},
  extraReducers: {
    /* -------------------- Get activities based on board id -------------------- */
    [getActivitiesByBoardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentBoardActivities = action.payload;
      delete state.errors;
    },
    [getActivitiesByBoardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getActivitiesByBoardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

// export const {} = slice.actions;

export default slice.reducer;
