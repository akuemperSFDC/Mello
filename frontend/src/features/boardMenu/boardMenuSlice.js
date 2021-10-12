import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false, createBoard: false, editCard: false };

const slice = createSlice({
  name: 'boardMenu',
  initialState: {
    visible: false,
    mainMenu: false,
    aboutMenu: false,
    backgroundMenu: false,
  },
  reducers: {
    menuVisible: (state, action) => {
      state.visible = action.payload;
      state.mainMenu = true;
      state.aboutMenu = false;
      state.backgroundMenu = false;
    },
    showMainMenu: (state, action) => {
      state.visible = true;
      state.mainMenu = true;
      state.aboutMenu = false;
      state.backgroundMenu = false;
    },
    showAboutMenu: (state, action) => {
      state.visible = true;
      state.mainMenu = false;
      state.aboutMenu = true;
      state.backgroundMenu = false;
    },
    showBackgroundMenu: (state, action) => {
      state.visible = true;
      state.mainMenu = false;
      state.aboutMenu = false;
      state.backgroundMenu = true;
    },
  },
  extraReducers: {},
});

export const { menuVisible, showMainMenu, showAboutMenu, showBackgroundMenu } =
  slice.actions;

export default slice.reducer;
