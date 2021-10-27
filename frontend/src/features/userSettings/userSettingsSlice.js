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
    resetUserSettingsSlice: () => this.initialState,
  },
  extraReducers: {},
});

export const { setTabValue, resetUserSettingsSlice } = slice.actions;

export default slice.reducer;
