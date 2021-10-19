import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* ------------------------------- Get lists ------------------------------ */

export const getListsAsync = createAsyncThunk(
  'lists/getListsAsync',
  async (boardId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/lists/board/${boardId}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Create list ------------------------------ */

export const createListAsync = createAsyncThunk(
  'lists/createListAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, title } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/lists/board/${id}`,
        { title },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Edit list ------------------------------ */

export const editListAsync = createAsyncThunk(
  'lists/editListAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, title, boardId } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/lists/${id}`,
        { title },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Delete list ------------------------------ */

export const deleteListAsync = createAsyncThunk(
  'lists/deleteListAsync',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:5000/api/lists/${id}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Move list ------------------------------ */

export const moveListAsync = createAsyncThunk(
  'lists/moveListAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { listId, boardId } = params;

      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/lists/${listId}/move`,
        { boardId },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Copy list ------------------------------ */

export const copyListAsync = createAsyncThunk(
  'lists/copyListAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { listId, boardId, title, cards } = params;

      const { token } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/lists/${listId}/copy`,
        { boardId, title, cards },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Create card ------------------------------ */

export const createCardAsync = createAsyncThunk(
  'cards/createCardAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, title } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/cards/list/${id}`,
        { title },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Edit card ------------------------------ */

export const editCardAsync = createAsyncThunk(
  'cards/editCardAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, title, description } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/cards/${id}`,
        { title, description },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Delete card ------------------------------ */

export const deleteCardAsync = createAsyncThunk(
  'cards/deleteCardAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:5000/api/cards/${id}`,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Move card ------------------------------ */

export const moveCardAsync = createAsyncThunk(
  'cards/moveCardAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, boardId, listId } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/cards/${id}/move`,
        { boardId, listId },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/* ------------------------------- Copy card ------------------------------ */

export const copyCardAsync = createAsyncThunk(
  'cards/copyCardAsync',
  async (params, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;

      const { id, boardId, listId } = params;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/cards/${id}/copy`,
        { boardId, listId },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slice = createSlice({
  name: 'lists',
  initialState: { loading: false, currentLists: {}, currentList: {} },
  reducers: {
    currentList: (state, action) => {
      state.currentList = action.payload;
    },
  },
  extraReducers: {
    // Get lists
    [getListsAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const normalizedLists = {};
      action.payload.forEach((list) => {
        normalizedLists[list._id] = list;
      });
      state.currentLists = normalizedLists;
      delete state.errors;
    },
    [getListsAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [getListsAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Create list
    [createListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists[action.payload._id] = { ...action.payload, cards: [] };
      state.newList = action.payload;
      delete state.errors;
    },
    [createListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [createListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Edit list
    [editListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists[action.payload._id] = action.payload;
      state.editedList = action.payload;
      delete state.errors;
    },
    [editListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [editListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Delete list
    [deleteListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      delete state.currentLists[action.payload._id];
      delete state.currentList[action.payload._id];
      delete state.errors;
    },
    [deleteListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [deleteListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Move list
    [moveListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      delete state.currentLists[action.payload._id];
      delete state.errors;
    },
    [moveListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [moveListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Copy list
    [copyListAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.copiedList = action.payload;
      delete state.errors;
    },
    [copyListAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [copyListAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Create card
    [createCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const listId = action.payload.list;
      state.currentLists[listId].cards.push(action.payload);
      delete state.errors;
    },
    [createCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [createCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Edit card
    [editCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const cardId = action.payload._id;
      const editedCardIndex = state.currentList.cards.findIndex(
        (card) => card._id === cardId
      );
      state.currentLists[action.payload.list].cards[editedCardIndex] =
        action.payload;
      state.currentList.cards[editedCardIndex] = action.payload;
      delete state.errors;
    },
    [editCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [editCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Delete card
    [deleteCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const { cardId, listId } = action.payload;
      const editedCardIndex = state.currentList.cards.findIndex(
        (card) => card._id === cardId
      );
      state.currentLists[listId].cards.splice(editedCardIndex, 1);
      state.currentList.cards.splice(editedCardIndex, 1);
      delete state.errors;
    },
    [deleteCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [deleteCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Move card
    [moveCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      const movedCardIndex = state.currentList.cards.findIndex(
        (card) => card._id === action.payload.card._id
      );
      state.currentLists[action.payload.oldList].cards.splice(
        movedCardIndex,
        1
      );
      state.currentList.cards.splice(action.payload.card.index - 1, 1);
      state.currentLists[action.payload.card.list].cards.splice(
        action.payload.card.index - 1,
        0,
        action.payload.card
      );
      delete state.errors;
    },
    [moveCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [moveCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },

    // Copy card
    [copyCardAsync.fulfilled]: (state, action) => {
      if (state.loading) state.loading = false;
      state.currentLists[action.payload.list].cards.push(action.payload);
      delete state.errors;
    },
    [copyCardAsync.rejected]: (state, action) => {
      if (state.loading) state.loading = false;
      state.errors = action.payload;
      state.errors = action.payload?.errors;
    },
    [copyCardAsync.pending]: (state, action) => {
      if (!state.loading) state.loading = true;
    },
  },
});

export const { currentList } = slice.actions;

export default slice.reducer;
