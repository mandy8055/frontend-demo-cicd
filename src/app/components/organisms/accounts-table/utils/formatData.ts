import { findPercentage } from 'src/app/common/utils';
import { AssetClassType, PortfolioCategory, type AccountsRow } from '../types';

export const formatRowData = (data: AccountsRow[]) => {
  const bottomRow = {} as AssetClassType<Partial<PortfolioCategory>>;
  let allPortfolioTotal = 0;
  let formattedTableData: AccountsRow[] = data.map((portfolio: AccountsRow) => {
    let portfolioTotal = 0;
    portfolio.portfolioCategories.forEach((category) => {
      portfolio[category.assetCategory] = category;
      portfolioTotal += category.marketValue;
      if (!bottomRow[category.assetCategory]) {
        bottomRow[category.assetCategory] = { marketValue: 0 };
      }
      bottomRow[category.assetCategory] = {
        ...bottomRow[category.assetCategory],
        marketValue:
          (bottomRow[category.assetCategory].marketValue || 0) +
          category.marketValue,
      };
    });
    portfolio['Totals'] = {
      marketValue: portfolioTotal,
    };
    allPortfolioTotal += portfolioTotal;
    return portfolio;
  });

  formattedTableData = formattedTableData.map((row) => {
    return {
      ...row,
      Totals: {
        ...row.Totals,
        percentage: findPercentage(
          row.Totals?.marketValue || 0,
          allPortfolioTotal,
        ),
      },
    };
  });
  Object.keys(bottomRow).forEach((assetKey) => {
    bottomRow[assetKey] = {
      ...bottomRow[assetKey],
      percentage: findPercentage(
        bottomRow[assetKey].marketValue || 0,
        allPortfolioTotal,
      ),
    };
  });
  const grandTotalRow = {
    ...bottomRow,
    Totals: { marketValue: allPortfolioTotal, percentage: 100 },
  };
  return { formattedTableData, grandTotalRow };
};
