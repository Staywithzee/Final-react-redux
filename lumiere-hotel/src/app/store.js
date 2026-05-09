import { configureStore } from '@reduxjs/toolkit';
import { roomsApi } from '../features/rooms/roomsApi';
import bookingReducer from '../features/booking/bookingSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    [roomsApi.reducerPath]: roomsApi.reducer,
    booking: bookingReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomsApi.middleware),
});
