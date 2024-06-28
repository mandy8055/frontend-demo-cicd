import { numberFormatter } from 'src/app/common/utils';

export const commonStockSectorChartOptions = {
  title: {
    text: 'Common Stock Sector',
    fontWeight: 'bold',
    enabled: false,
  },
  series: [
    {
      data: [
        { ingredient: 'Operating', weight: 33 },
        { ingredient: 'Core', weight: 66 },
        { ingredient: 'Opportunistic', weight: 66 },
      ],
      type: 'pie',
      legendItemKey: 'ingredient',
      angleKey: 'weight',
      calloutLabel: {
        offset: 10,
      },
      tooltip: {
        renderer: ({
          datum,
          angleKey,
          calloutLabelKey = 'ingredient',
        }: any) => ({
          title: `${datum[calloutLabelKey]}`,
          content: `${datum[angleKey]}`,
        }),
      },
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

export const assetAllocationChartOptions = {
  data: [
    { asset: 'Stocks', amount: 60000 },
    { asset: 'Bonds', amount: 40000 },
    { asset: 'Cash', amount: 7000 },
    { asset: 'Stocks', amount: 60000 },
    { asset: 'Bonds', amount: 40000 },
    { asset: 'Cash', amount: 7000 },
  ],
  title: {
    text: 'Asset Allocation',
    enabled: false,
  },
  series: [
    {
      type: 'donut',
      legendItemKey: 'asset',
      angleKey: 'amount',
      innerRadiusRatio: 0.7,
      innerLabels: [
        {
          text: 'Total',
          fontSize: 16,
          margin: 10,
        },
        {
          text: numberFormatter(352345245, 'en-US'),
          fontSize: 24,
        },
      ],
      tooltip: {
        renderer: function ({ datum, xKey }: any) {
          const amount = datum['amount'];
          const formattedAmount = amount.toFixed(1);
          return {
            title: datum[xKey],
            content: formattedAmount + '%',
          };
        },
      },
    },
  ],
  legend: {
    item: {
      marker: {
        shape: 'circle',
      },
    },
  },
};
