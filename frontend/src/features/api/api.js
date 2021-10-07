// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
//   prepareHeaders: (headers, { getState }) => {
//     // By default, if we have a token in the store, let's use that for authenticated requests
//     const token = getState().auth.token;
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
//   tagTypes: ['Boards', 'User'],
//   endpoints: (build) => ({
//     // User/Auth
//     login: build.mutation({
//       query: (credentials) => ({
//         url: '/auth/login',
//         method: 'POST',
//         headers: {
//           'content-type': 'application/json',
//         },
//         body: credentials,
//       }),
//     }),
//     register: build.query({
//       query: (body) => ({
//         url: 'register',
//         method: 'POST',
//         body,
//       }),
//     }),
//     // Boards
//     getBoards: build.query({
//       query: () => 'boards',
//       providesTags: (result) =>
//         result ? result.map(({ id }) => ({ type: 'Boards', id })) : [],
//     }),
//     createBoard: build.query({
//       query: (body) => ({
//         url: '',
//       }),
//     }),
//   }),
// });

// export const { useGetBoardsQuery, useLoginMutation } = api;
