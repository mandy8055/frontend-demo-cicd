export interface PrivateEquityData {
  investor: string;
  inceptionDate: string;
  valuationDate: string;
  commitmentDouble: number;
  paidInCapitalDouble: number;
  cumulativeDistributionDouble: number;
  totalInvestmentValueDouble: number;
  multipleDouble: number;
  commitment: string;
  paidInCapital: string;
  cumulativeDistribution: string;
  totalInvestmentValue: string;
  iRR: string;
  multiple: string;
  commentary: string;
  reportDate: string;
  securityId: number;
  portfolioId: number;
  valuationDt: string;
  reportDt: number;
  investorInceptionDate: string;
  sector: string;
  uncalledCommitmentDouble: number;
  remainingValueDouble: number;
  gainLossOnInvestmentDouble: number;
  uncalledCommitment: string;
  remainingValue: string;
  gainLossOnInvestment: string;
  level: number;
  vintageYear: number;
  childIndexNumber: number;
  securitySymbol: string;
  disclaimer: string;
  portfolioGroupId: string;
  portfolioGroupCode: string;
  ordinalValue: number;
  irrdouble: number;
}

export interface PEImperativeHandle {
  expand: () => void;
  collapse: () => void;
}
