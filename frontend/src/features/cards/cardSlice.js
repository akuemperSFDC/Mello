import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'cards',
  initialState: { currentCard: {} },
  reducers: {
    currentCard: (state, action) => {
      state.currentCard = action.payload;
    },
  },
  extraReducers: {},
});

export const { currentCard } = slice.actions;

export default slice.reducer;
