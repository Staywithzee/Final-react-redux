import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => '/Booking',
      providesTags: ['Booking'],
    }),
    createBooking: builder.mutation({
      query: (body) => ({ url: '/Booking', method: 'POST', body }),
      invalidatesTags: ['Booking'],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({ url: `/Booking/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
