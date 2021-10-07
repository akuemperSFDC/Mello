import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/boards/boardSlice.js';
import authReducer from '../features/auth/authSlice.js';

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
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
  devTools: true,
  preloadedState,
});
