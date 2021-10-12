import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cards',
  initialState: { currentCard: {} },
  reducers: {
    currentCard: (state, action) => {
      state.currentCard = action.payload;
    },
    editCurrentCard: (state, action) => {
      state.currentCard.title = action.payload;
    },
    deleteCurrentCard: (state, action) => {
      state.currentCard = {};
    },
  },
  extraReducers: {},
});

export const { currentCard, editCurrentCard, deleteCurrentCard } =
  slice.actions;

export default slice.reducer;
