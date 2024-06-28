export type HoldingsSummaryData = {
  assetClassId: number;
  securityAssetClassName: string;
  securitySubAssetClassName: string;
  securityGroupName: string;
  securitySectorName: string;
  securityName: string;
  portfolioId: number;
  securityId: number;
  annualIncome: number;
  quantity: number;
  totalAdjustedCost: number;
  price: number;
  marketValue: number;
  yield: number;
  unrealizedGainLoss: number;
  accruedInterestFlag: boolean;
  accruedInterestMarketValue: number;
  interestPercentage: number;
  interestText: string;
  isTotalRow: false;
};

type HoldingsSummaryBottomRow = {
  marketValue: number;
  unrealizedGainLoss?: number;
  totalAdjustedCost?: number;
  annualIncome?: number;
  interestPercentage?: number;
  quantity:
    | 'Total Portfolio'
    | 'Total Accrued Interest'
    | 'Total Portfolio with Accrued Interest';
  isTotalRow: true;
};
export type HoldingsSummaryGridData =
  | HoldingsSummaryData
  | HoldingsSummaryBottomRow;

export type HoldingsSummaryQueryResp = {
  rows: HoldingsSummaryGridData[];
  totalMarketValue: number;
};
export interface HoldingsImperativeHandle {
  expand: () => void;
  collapse: () => void;
}
