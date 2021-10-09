import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false, createBoard: false };

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    createBoardModal: (state, action) => {
      state.createBoard = action.payload;
    },
  },
  extraReducers: {},
});

export const { createBoardModal } = slice.actions;

export default slice.reducer;
