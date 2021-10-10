import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false, value: null };

const slice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload;
    },
    setShowSidebar: (state, action) => {
      state.visibility = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSelected, setShowSidebar } = slice.actions;

export default slice.reducer;
