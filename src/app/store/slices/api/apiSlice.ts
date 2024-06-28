import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './customBaseQuery';

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
});
