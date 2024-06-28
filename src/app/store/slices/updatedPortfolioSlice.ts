/* TODO: This file can be merged with portfolioSlice. 
I have kept this separately to minimize the breaking changes.
*/
import { transformPortfoliosResponse } from '../transformations';
import { apiSlice } from './api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolios: builder.query<unknown, void>({
      query: () => ({
        url: 'v1/reference/portfolios-and-groups',
        method: 'get',
      }),
      transformResponse: transformPortfoliosResponse,
    }),
  }),
});

export const { useGetPortfoliosQuery } = extendedApiSlice;
