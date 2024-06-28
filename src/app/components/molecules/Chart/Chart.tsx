import { AgChartOptions } from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { cn } from 'src/lib/utils';

export const Chart = ({ options, id, className }: any) => {
  const handleClick = () => {
    console.log('redirect');
  };
  const defaultClasses =
    'w-full h-full pb-8 rounded-xl p-5 shadow-[0_0px_30px_0px_rgba(0,0,0,0.06)]';
  const containerClasses = cn(defaultClasses, className);

  return (
    <div className={containerClasses} data-testid="chart-container" id={id}>
      <div className="flex items-center">
        <h4 className="font-bold text-xl">{options?.title?.text || ''}</h4>
        <SquareArrowOutUpRight
          size={20}
          className="ml-2 cursor-pointer"
          onClick={handleClick}
          color="#004874"
        />
      </div>
      <AgChartsReact autoSize options={options as AgChartOptions} />
    </div>
  );
};
