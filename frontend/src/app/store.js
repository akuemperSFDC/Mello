import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/boards/boardSlice.js';
import listReducer from '../features/lists/listsSlice.js';
import cardReducer from '../features/cards/cardSlice.js';
import authReducer from '../features/auth/authSlice.js';
import sidebarReducer from '../features/sidebar/sidebarSlice.js';
import modalReducer from '../features/modal/modalSlice.js';
import listDrawerReducer from '../features/listDrawer/listDrawerSlice.js';
import boardMenuReducer from '../features/boardMenu/boardMenuSlice.js';

const auth = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : { user: null, token: null };

const { user, token } = auth;

const preloadedState = {
  auth: { user, token, loading: false },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    lists: listReducer,
    cards: cardReducer,
    sidebar: sidebarReducer,
    modals: modalReducer,
    listDrawer: listDrawerReducer,
    boardMenu: boardMenuReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
  devTools: true,
  preloadedState,
});
