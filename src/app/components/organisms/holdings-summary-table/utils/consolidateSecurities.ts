import {
  HoldingsSummaryData,
  HoldingsSummaryGridData,
  HoldingsSummaryQueryResp,
} from '../types';
function consolidateSecurities(
  data: HoldingsSummaryData[],
  portfolio: number[],
): HoldingsSummaryQueryResp {
  type Ttemp = Record<string, HoldingsSummaryData>;
  const temp: Ttemp = {};
  let totalMktVal = 0;
  let totalAdjustedCostSum = 0;
  let totalAnnualIncome = 0;
  let totalUnrealisedGainLossValue = 0;
  let totalAccruedInterest = 0;
  const filteredSecurities = data.filter((item) =>
    portfolio.includes(item.portfolioId),
  );
  filteredSecurities.forEach((item) => {
    const {
      securityId,
      annualIncome,
      quantity,
      totalAdjustedCost,
      price,
      marketValue,
      unrealizedGainLoss,
      accruedInterestMarketValue,
    } = item;

    if (temp[securityId]) {
      temp[securityId]['annualIncome'] += annualIncome;
      temp[securityId]['quantity'] += quantity;
      temp[securityId]['totalAdjustedCost'] += totalAdjustedCost;
      temp[securityId]['price'] += price;
      temp[securityId]['marketValue'] += marketValue;
      temp[securityId]['unrealizedGainLoss'] += unrealizedGainLoss;
      temp[securityId]['accruedInterestMarketValue'] +=
        accruedInterestMarketValue;
    } else {
      temp[securityId] = item;
    }
    totalMktVal += marketValue;
    totalAdjustedCostSum += totalAdjustedCost;
    totalAnnualIncome += annualIncome;
    totalUnrealisedGainLossValue += unrealizedGainLoss;
    totalAccruedInterest += accruedInterestMarketValue;
  });
  const rows: HoldingsSummaryGridData[] = Object.keys(temp).map(
    (item) => temp[item],
  );
  rows.push({
    quantity: 'Total Portfolio',
    totalAdjustedCost: totalAdjustedCostSum,
    annualIncome: totalAnnualIncome,
    interestPercentage: 100,
    marketValue: totalMktVal,
    unrealizedGainLoss: totalUnrealisedGainLossValue,
    isTotalRow: true,
  });
  rows.push({
    quantity: 'Total Accrued Interest',
    marketValue: totalAccruedInterest,
    isTotalRow: true,
  });
  rows.push({
    quantity: 'Total Portfolio with Accrued Interest',
    marketValue: totalMktVal + totalAccruedInterest,
    isTotalRow: true,
  });
  return { rows, totalMarketValue: totalMktVal };
}
export default consolidateSecurities;
