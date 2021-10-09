import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false, value: null };

const slice = createSlice({
  name: 'listDrawer',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSelected } = slice.actions;

export default slice.reducer;
