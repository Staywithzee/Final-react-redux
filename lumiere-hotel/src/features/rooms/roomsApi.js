import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Room'],
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => '/rooms',
      providesTags: ['Room'],
    }),
    getRoomById: builder.query({
      query: (id) => `/rooms/${id}`,
      providesTags: (result, error, id) => [{ type: 'Room', id }],
    }),
    addRoom: builder.mutation({
      query: (body) => ({ url: '/rooms', method: 'POST', body }),
      invalidatesTags: ['Room'],
    }),
    updateRoom: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/rooms/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Room', id }, 'Room'],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({ url: `/rooms/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Room'],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomsApi;
