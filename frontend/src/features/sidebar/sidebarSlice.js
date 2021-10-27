import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'sidebar',
  initialState: {
    loading: false,
    value: null,
  },
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload;
    },
    setShowSidebar: (state, action) => {
      state.visibility = action.payload;
    },
    resetSidebarSlice: () => this.initialState,
  },
  extraReducers: {},
});

export const { setSelected, setShowSidebar, resetSidebarSlice } = slice.actions;

export default slice.reducer;
