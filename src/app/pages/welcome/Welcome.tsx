import { Insights } from 'src/app/components';
import CarouselContainer from 'src/app/components/molecules/CarouselContainer';
import InsightCard from 'src/app/components/molecules/InsightCard/InsightCard';
import { Transactions } from 'src/app/components/organisms/transactions/Transactions';
import {
  assetAllocationChartOptions,
  commonStockSectorChartOptions,
} from '../../components/molecules/Chart/chart-options/welcome';

function WelcomeScreen() {
  const ccOptions = [
    { options: assetAllocationChartOptions },
    { options: commonStockSectorChartOptions },
    { options: assetAllocationChartOptions },
    { options: commonStockSectorChartOptions },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between gap-4">
        <CarouselContainer chartOptions={ccOptions} />
        <InsightCard />
      </div>
      <Transactions />
      <Insights />
    </div>
  );
}

export default WelcomeScreen;
