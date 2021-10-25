import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

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

      const { data } = await api.get(`/activities/${id}`, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------- Get next batch of board activities ------------------- */

export const getNextActivitiesByBoardAsync = createAsyncThunk(
  'activities/getNextActivitiesByBoardAsync',
  async (params, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const { id, prevItem } = params;
      const count = getState().activities.currentBoardActivities.length;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.get(
        `/activities/${id}/next/?prevItem=${prevItem}&count=${count}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------ Get activities for user ------------------------------ */

export const getActivitiesForUserAsync = createAsyncThunk(
  'activities/getActivitiesForUserAsync',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await api.get(`/activities/user`, config);

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
    currentUserActivities: [],
    lastItemFetched: false,
    prevItem: null,
  },
  reducers: {
    resetActivities: (state, action) => {
      state.currentBoardActivities = [];
      state.lastItemFetched = false;
      state.prevItem = null;
    },
  },
  extraReducers: {
    /* -------------------- Get activities based on board id -------------------- */
    [getActivitiesByBoardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentBoardActivities = action.payload.activities;
      state.prevItem = action.payload.lastItem;
      state.lastItemFetched = false;
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

    /* -------------------- Get next batch of activities based on board id -------------------- */
    [getNextActivitiesByBoardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentBoardActivities.push(...action.payload.activities);
      state.lastItemFetched = action.payload.lastItemFetched || false;
      state.prevItem = action.payload.lastItem;
      delete state.errors;
    },
    [getNextActivitiesByBoardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getNextActivitiesByBoardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    /* -------------------- Get activities based on user -------------------- */
    [getActivitiesForUserAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentUserActivities = action.payload.activities;
      // state.prevItem = action.payload.lastItem;
      // state.lastItemFetched = false;
      delete state.errors;
    },
    [getActivitiesForUserAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getActivitiesForUserAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

export const { resetActivities } = slice.actions;

export default slice.reducer;
