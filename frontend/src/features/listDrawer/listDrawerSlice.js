import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'listDrawer',
  initialState: { loading: false, value: null },
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload;
    },
    setShown: (state, action) => {
      state.visible = action.payload;
    },
    resetListDrawerSlice: () => this.initialState,
  },
  extraReducers: {},
});

export const { setSelected, setShown, resetListDrawerSlice } = slice.actions;

export default slice.reducer;
