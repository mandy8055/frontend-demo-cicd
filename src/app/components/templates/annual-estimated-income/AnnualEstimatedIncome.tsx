import { Chart } from '../../molecules/Chart/Chart';
import { annualEstimatedIncomeOptions } from '../../molecules/Chart/chart-options/annualEstimatedIncome';
import { AnnualEstimatedIncomeTable } from '../../organisms/annual-estimated-income-table/AnnualEstimatedIncomeTable';

const AEI_DISCLAIMER_TEXT =
  'Estimated annual income is a projected figure. For fixed income securities, estimated income is the quoted rate of annual income per unit, multiplied by the number of units held as of this report. For money market, equity, and mutual fund securities, estimated income is the total value of dividends per share paid to shareholders over the trailing twelve month period, multiplied by the number of units held as of this report. For illiquid or alternative investments, estimated income is the conservative estimate of Brown Advisory.';

export default function AnnualEstimatedIncome() {
  return (
    <>
      <div className="flex gap-8 mt-6 items-stretch">
        <AnnualEstimatedIncomeTable />
        <div>
          <Chart
            options={annualEstimatedIncomeOptions}
            id="annual-estimated-income-chart"
            className="w-[400px] max-h-[414px]"
          />
        </div>
      </div>
      <hr data-testid="horizontal-divider" />
      <p className="mt-8 text-xs">{AEI_DISCLAIMER_TEXT}</p>
    </>
  );
}
