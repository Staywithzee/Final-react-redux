import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedRoom: null,
  checkIn: '',
  checkOut: '',
  guests: 1,
  status: 'idle',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    selectRoom(state, action) {
      state.selectedRoom = action.payload;
    },
    setDates(state, action) {
      const { checkIn, checkOut } = action.payload;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
    },
    setGuests(state, action) {
      state.guests = action.payload;
    },
    clearBooking(state) {
      state.selectedRoom = null;
      state.checkIn = '';
      state.checkOut = '';
      state.guests = 1;
      state.status = 'idle';
    },
  },
});

export const { selectRoom, setDates, setGuests, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
