import { createSelector } from '@reduxjs/toolkit';
import { roomsApi } from './roomsApi';

export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectActiveCategory = (state) => state.ui.activeCategory;

export const selectFilteredRooms = createSelector(
  [(state) => state, selectSearchQuery, selectActiveCategory],
  (state, search, category) => {
    const allRooms = roomsApi.endpoints.getRooms.select()(state)?.data ?? [];
    return allRooms.filter((room) => {
      const matchCat = category === 'All' || room.category === category;
      const matchSearch = room.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }
);
