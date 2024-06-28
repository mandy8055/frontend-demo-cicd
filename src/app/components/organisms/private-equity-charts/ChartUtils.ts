import { AgChartOptions } from 'ag-charts-community';
import { numberFormatter } from 'src/app/common/utils';
import type { ChartData, Datum } from './types';

export const customTooltipRenderer = ({ datum }: { datum: Datum }): string => {
  const { label, amount, categories } = datum;
  let categoriesList = '';

  if (Array.isArray(categories) && categories.length > 0) {
    categoriesList = categories
      .map((category) => `<li>${category}</li>`)
      .join('');
    categoriesList = '<ul>' + categoriesList + '</ul>';
  }

  const tooltipTitle =
    '<div class="ag-chart-tooltip-title">' + label + '</div>';
  const tooltipContent =
    '<div class="ag-chart-tooltip-content">' +
    amount +
    categoriesList +
    '</div>';
  return tooltipTitle + tooltipContent;
};

export const getAbbreviatedCategory = (asset: string): string => {
  return asset
    .split(' ')
    .map((word) => word.trim().charAt(0))
    .join('');
};

export function transformChartData(data: {
  chartData: ChartData;
  title: string;
}) {
  const chartData: Datum[] = data.chartData.map(
    ([asset, amount, categories]) => {
      const abbreviatedCategory =
        asset.length > 15 ? getAbbreviatedCategory(asset) : asset;
      return {
        label: asset,
        asset: abbreviatedCategory,
        amount,
        categories,
      };
    },
  );

  const totalAmount: number = chartData.reduce(
    (total, data) => total + data.amount,
    0,
  );

  const donutChartOptions: AgChartOptions = {
    data: chartData,
    title: {
      text: data.title,
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
            fontSize: 12,
            margin: 10,
          },
          {
            text: numberFormatter(totalAmount, 'en-US'),
            fontSize: 12,
          },
        ],
        tooltip: {
          renderer: customTooltipRenderer,
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

  return donutChartOptions;
}
