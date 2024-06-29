import { ChartData } from '../../../organisms/private-equity-charts/types/index';

interface ButtonRenderType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isCollapsed: boolean;
}

interface ChartDataType {
  title: string;
  chartData: ChartData;
}

export type { ButtonRenderType, ChartDataType };
