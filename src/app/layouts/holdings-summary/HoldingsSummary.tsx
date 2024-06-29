import { ChevronDown, ListCollapse } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { DISCLAIMER_PROPRIETARY } from 'src/app/common/constants';
import { useAppSelector } from 'src/app/common/hooks';
import { HoldingsSummaryTable } from 'src/app/components';
import { HoldingsImperativeHandle } from 'src/app/components/organisms/holdings-summary-table/types';
import { Button } from 'src/app/components/ui/button';
import { selectDate } from 'src/app/store/slices/dateSlice';
import { ButtonRenderType, HoldingsSummaryType } from './types';

const CurrencyIndicator = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => {
  return (
    <>
      <span className={`h-2 w-2 rounded-full bg-[${color}]`}></span>
      <p className="text-xs">{text}</p>
    </>
  );
};

function HoldingsSummary(props: HoldingsSummaryType) {
  const { isMultiCurrency = false } = props;
  const [expand, setExpand] = useState(false);
  const holdingsTableRef = useRef<HoldingsImperativeHandle>(null);
  const selectedDate = useAppSelector(selectDate);
  const selectedDateText = `As of ${selectedDate}`;
  const expandHandler = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (holdingsTableRef.current) {
      !expand
        ? holdingsTableRef.current.expand()
        : holdingsTableRef.current.collapse();
      setExpand((prev) => {
        return !prev;
      });
    }
  };
  const ButtonRender = (props: ButtonRenderType) => {
    const { text, Icon } = props;
    return (
      <Button
        className="border-[#0076be] text-xs rounded-2xl"
        variant="outline"
        size="sm"
        {...props}
      >
        <div className="flex gap-2">
          <span className="text-[#163964]">{text}</span>
          <Icon size={16} />
        </div>
      </Button>
    );
  };
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <div className="flex gap-2">
          <div className="bg-[#e6f1f9] rounded-2xl text-xs text-[#163964] py-2 px-4 text-center">
            {selectedDateText}
          </div>
          <ButtonRender
            text={expand ? 'Collapse' : 'Expand'}
            onClick={expandHandler}
            Icon={ListCollapse}
            data-testid="expand-collapse"
          />
        </div>
        <div className="flex gap-2 items-center">
          {isMultiCurrency && (
            <div className="flex gap-2 items-center">
              <CurrencyIndicator text="Local Currency" color="#ebaf58" />
              <CurrencyIndicator text="Reporting Currency" color="#869AFE" />
            </div>
          )}
          <ButtonRender
            text="Export"
            onClick={() => {
              return;
            }}
            Icon={ChevronDown}
          />
        </div>
      </div>
      <HoldingsSummaryTable
        ref={holdingsTableRef}
        isMultiCurrency={isMultiCurrency}
      />
      <p className="mt-12 text-xs">{DISCLAIMER_PROPRIETARY}</p>
    </div>
  );
}

export default HoldingsSummary;
