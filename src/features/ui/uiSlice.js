import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  activeCategory: 'All',
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { setSearchQuery, setActiveCategory, showNotification, clearNotification } =
  uiSlice.actions;
export default uiSlice.reducer;
