import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cardActionsMenu',
  initialState: {
    moveMenu: false,
    copyMenu: false,
  },
  reducers: {
    showMoveCardActionsMenu: (state, action) => {
      state.moveMenu = true;
      state.copyMenu = false;
    },
    showCopyCardActionsMenu: (state, action) => {
      state.moveMenu = false;
      state.copyMenu = true;
    },
  },
  extraReducers: {},
});

export const { showMoveCardActionsMenu, showCopyCardActionsMenu } =
  slice.actions;

export default slice.reducer;
