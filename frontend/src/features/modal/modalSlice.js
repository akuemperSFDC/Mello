import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modals',
  initialState: {
    loading: false,
    createBoard: false,
    editCard: false,
    deleteBoard: false,
  },
  reducers: {
    createBoardModal: (state, action) => {
      state.createBoard = action.payload;
    },
    editCardModal: (state, action) => {
      state.editCard = action.payload;
    },
    deleteBoardModal: (state, action) => {
      state.deleteBoard = action.payload;
    },
    resetModalsSlice: () => this.initialState,
  },
  extraReducers: {},
});

export const {
  createBoardModal,
  editCardModal,
  deleteBoardModal,
  resetModalsSlice,
} = slice.actions;

export default slice.reducer;
