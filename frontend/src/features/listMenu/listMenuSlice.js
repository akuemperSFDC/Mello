import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'listMenu',
  initialState: {
    mainMenu: true,
    copyMenu: false,
    moveMenu: false,
  },
  reducers: {
    showMainMenu: (state, action) => {
      state.mainMenu = true;
      state.copyMenu = false;
      state.moveMenu = false;
    },
    showCopyListMenu: (state, action) => {
      state.mainMenu = false;
      state.copyMenu = true;
      state.moveMenu = false;
    },
    showMoveListMenu: (state, action) => {
      state.mainMenu = false;
      state.copyMenu = false;
      state.moveMenu = true;
    },
  },
  extraReducers: {},
});

export const { showMainMenu, showCopyListMenu, showMoveListMenu } =
  slice.actions;

export default slice.reducer;
