import { numberFormatter } from 'src/app/common/utils';
import { incomeData } from '../../../organisms/annual-estimated-income-table/mock/incomeData';

export const annualEstimatedIncomeOptions = {
  data: [...incomeData],
  title: {
    text: 'Annual Estimated Income',
    enabled: false,
  },
  series: [
    {
      type: 'donut',
      legendItemKey: 'assetClassFullName',
      angleKey: 'annualIncomePercent',
      innerRadiusRatio: 0.7,
      innerLabels: [
        {
          text: 'Total',
          fontSize: 16,
          margin: 10,
        },
        {
          text: numberFormatter(12345, 'en-US'),
          fontSize: 24,
        },
      ],
    },
  ],
  legend: {
    enabled: true,
    item: {
      marker: {
        shape: 'circle',
      },
    },
  },
};
