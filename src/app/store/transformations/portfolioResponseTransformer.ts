import { Portfolio, TransformedResponse } from 'src/app/common/types';

function transformPortfoliosResponse(
  response: Portfolio[],
): TransformedResponse {
  const specificPortfolios: Record<
    string,
    {
      portfolioGroupName: string;
      portfolioIds: { portfolioName: string; portfolioId: string }[];
    }
  > = {};
  const allPortfolios: string[] = [];

  response.forEach((portfolio) => {
    const { portfolioId, portfolioGroupId, portfolioGroupName, portfolioName } =
      portfolio;

    if (!specificPortfolios[portfolioGroupId]) {
      specificPortfolios[portfolioGroupId] = {
        portfolioGroupName,
        portfolioIds: [],
      };
    }
    specificPortfolios[portfolioGroupId].portfolioIds.push({
      portfolioName,
      portfolioId,
    });

    allPortfolios.push(portfolioId);
  });

  return { specificPortfolios, allPortfolios };
}

export default transformPortfoliosResponse;
