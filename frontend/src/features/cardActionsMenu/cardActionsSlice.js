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
    resetCardActionsMenuSlice: (state, action) => {
      return this.initialState;
    },
  },
  extraReducers: {},
});

export const {
  showMoveCardActionsMenu,
  showCopyCardActionsMenu,
  resetCardActionsMenuSlice,
} = slice.actions;

export default slice.reducer;
