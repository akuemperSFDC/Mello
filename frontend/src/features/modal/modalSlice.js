import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false, createBoard: false, editCard: false };

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    createBoardModal: (state, action) => {
      state.createBoard = action.payload;
    },
    editCardModal: (state, action) => {
      state.editCard = action.payload;
    },
  },
  extraReducers: {},
});

export const { createBoardModal, editCardModal } = slice.actions;

export default slice.reducer;
