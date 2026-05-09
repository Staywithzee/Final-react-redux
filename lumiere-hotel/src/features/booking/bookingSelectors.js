import { createSelector } from '@reduxjs/toolkit';

const selectBooking = (state) => state.booking;

export const selectTotalNights = createSelector(
  selectBooking,
  ({ checkIn, checkOut }) => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000));
  }
);

export const selectTotalPrice = createSelector(
  selectBooking,
  selectTotalNights,
  ({ selectedRoom }, nights) => (selectedRoom ? selectedRoom.pricePerNight * nights : 0)
);
