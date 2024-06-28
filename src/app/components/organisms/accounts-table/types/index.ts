interface PortfolioCategory {
  assetCategory: AssetKeys;
  marketValue: number;
  percentage: number;
  displayOrder: number;
}

type AssetKeys = keyof AssetClassType<PortfolioCategory>;

interface AssetClassType<T> extends Record<string, any> {
  ['Cash & Equivalents']: T;
  ['Large Cap U.S. Equities']: T;
  ['Small/Mid Cap U.S. Equities']: T;
  ['Multi-Cap U.S. Equities']: T;
  ['Global/Developed International']: T;
  ['Emerging Markets']: T;
  ['Real Estate']: T;
  ['Credit']: T;
  ['Private Equities']: T;
  ['Hedge Funds']: T;
  ['Totals']: T;
}

interface AccountsRow
  extends Partial<AssetClassType<Partial<PortfolioCategory>>> {
  portfolioId: string;
  portfolioName: string;
  portfolioCode: string;
  portfolioCategories: PortfolioCategory[];
}

export { AccountsRow, AssetClassType, AssetKeys, PortfolioCategory };
