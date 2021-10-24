import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/boards/boardSlice.js';
import listReducer from '../features/lists/listsSlice.js';
import cardReducer from '../features/cards/cardSlice.js';
import authReducer from '../features/auth/authSlice.js';
import sidebarReducer from '../features/sidebar/sidebarSlice.js';
import modalReducer from '../features/modal/modalSlice.js';
import listDrawerReducer from '../features/listDrawer/listDrawerSlice.js';
import boardMenuReducer from '../features/boardMenu/boardMenuSlice.js';
import searchReducer from '../features/search/searchSlice.js';
import listMenuReducer from '../features/listMenu/listMenuSlice.js';
import cardActionsMenuReducer from '../features/cardActionsMenu/cardActionsSlice.js';
import activitiesReducer from '../features/activities/activitySlice.js';
import userSettingsReducer from '../features/userSettings/userSettingsSlice.js';

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
    activities: activitiesReducer,
    boardMenu: boardMenuReducer,
    boards: boardReducer,
    cardActionsMenu: cardActionsMenuReducer,
    cards: cardReducer,
    listDrawer: listDrawerReducer,
    listMenu: listMenuReducer,
    lists: listReducer,
    modals: modalReducer,
    search: searchReducer,
    sidebar: sidebarReducer,
    userSettings: userSettingsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
  devTools: true,
  preloadedState,
});
