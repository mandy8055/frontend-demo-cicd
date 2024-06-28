import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Button } from 'src/app/components/ui/button';
import { PrivateEquityDisclaimer } from '../../atoms/private-equity-disclaimer/PrivateEquityDisclaimer';
import CarouselContainer from '../../molecules/CarouselContainer/CarouselContainer';
import { transformChartData } from '../../organisms/private-equity-charts/ChartUtils';
import ivChartMockedData from '../../organisms/private-equity-charts/mock/investment-value-data.json';
import picChartMockedlData from '../../organisms/private-equity-charts/mock/paid-in-capital-data.json';
import { PrivateEquityTable } from '../../organisms/private-equity-table/PrivateEquityTable';
import type { PEImperativeHandle } from '../../organisms/private-equity-table/types';
import type { ButtonRenderType, ChartDataType } from './types';

export default function PrivateEquity() {
  const [collapsed, setCollapsed] = useState(true);
  const peTableRef = useRef<PEImperativeHandle>(null);
  const ccOptions = {
    className: 'max-h-[414px] p-4',
    chartOptions: [
      {
        id: 'paid-in-capital-chart',
        className: 'w-[350px] max-h-[414px]',
        options: transformChartData({
          title: 'Paid In Capital',
          chartData: picChartMockedlData,
        } as ChartDataType),
      },
      {
        id: 'investment-value-chart',
        className: 'w-[350px] max-h-[414px]',
        options: transformChartData({
          title: 'Investment Value',
          chartData: ivChartMockedData,
        } as ChartDataType),
      },
    ],
  };
  const toggleHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (peTableRef.current) {
      !collapsed ? peTableRef.current.collapse() : peTableRef.current.expand();
      setCollapsed((prev) => !prev);
    }
  };
  const ButtonRender = (props: ButtonRenderType) => {
    const { text, isCollapsed } = props;
    return (
      <Button
        className="border-[#0076be] text-xs rounded-2xl"
        variant="outline"
        size="sm"
        {...props}
      >
        <div className="flex gap-2">
          <span className="text-[#163964]">{text}</span>
          {isCollapsed && <CircleArrowUp size={16} />}
          {!isCollapsed && <CircleArrowDown size={16} />}
        </div>
      </Button>
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="bg-[#e6f1f9] rounded-2xl text-xs text-[#163964] py-2 px-4 text-center">
            As of 01-04-2024
          </div>
          <ButtonRender
            text={collapsed ? 'Collapse' : 'Expand'}
            onClick={toggleHandler}
            isCollapsed={collapsed}
            data-testid="expand-collapse"
          />
        </div>
        <div className="flex gap-2 items-center export-dropdown"></div>
      </div>
      <div className="flex gap-2 justify-between">
        <PrivateEquityTable ref={peTableRef} />
        <div className="items-start max-w-[380px]">
          <CarouselContainer
            carouselItemClassName={ccOptions.className}
            chartOptions={ccOptions.chartOptions}
          />
        </div>
      </div>
      <hr data-testid="horizontal-divider" />
      <div className="mt-8">
        <PrivateEquityDisclaimer />
      </div>
    </>
  );
}
