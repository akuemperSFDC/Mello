import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'listMenu',
  initialState: {
    tabValue: 0,
  },
  reducers: {
    setTabValue: (state, action) => {
      state.tabValue = action.payload;
    },
  },
  extraReducers: {},
});

export const { setTabValue } = slice.actions;

export default slice.reducer;
