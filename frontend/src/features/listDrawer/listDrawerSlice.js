import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false, value: null };

const slice = createSlice({
  name: 'listDrawer',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload;
    },
    setShown: (state, action) => {
      state.visible = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSelected, setShown } = slice.actions;

export default slice.reducer;
