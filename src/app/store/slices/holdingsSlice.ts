import {
  HoldingsSummaryData,
  HoldingsSummaryQueryResp,
} from 'src/app/components/organisms/holdings-summary-table/types';
import consolidateSecurities from 'src/app/components/organisms/holdings-summary-table/utils/consolidateSecurities';
import store from '../../store';
import { apiSlice } from './api/apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHoldings: builder.query<
      HoldingsSummaryQueryResp,
      { portfolioIds: number[]; reportDate: string }
    >({
      query: (body) => ({
        url: 'v1/holdings/summary',
        method: 'post',
        data: body,
      }),
      transformResponse: (responseData: HoldingsSummaryData[]) => {
        const selectedPortfolio = store.getState().portfolio.selectedPortfolio;
        const { rows, totalMarketValue } = consolidateSecurities(
          responseData,
          selectedPortfolio,
        );
        return { rows, totalMarketValue };
      },
    }),
  }),
});

export const { useGetHoldingsQuery } = extendedApiSlice;
