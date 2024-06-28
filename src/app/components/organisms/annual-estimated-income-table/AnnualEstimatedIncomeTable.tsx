import { type ValueFormatterParams } from '@ag-grid-community/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { useMemo, useState } from 'react';
import { AgGrid } from 'src/app/components';
import { incomeData } from './mock/incomeData';

interface rowType {
  assetClass?: string;
  assetClassFullName: string;
  categoryPer?: number;
  annualIncomePercent: number;
  estimatedIncome: number;
}

export const AnnualEstimatedIncomeTable = () => {
  const [rowData, setRowData] = useState<rowType[]>([]);

  const colDefs = useMemo(
    () => [
      {
        field: 'assetClassFullName',
        headerName: 'Asset Class',
        flex: 1,
        group: true,
        cellStyle: { color: '#0076be' },
      },
      {
        field: 'estimatedIncome',
        headerName: 'Estimated Income',
        flex: 1,
        aggFunc: 'sum',
      },
      {
        field: 'annualIncomePercent',
        headerName: 'Percentage',
        flex: 1,
        aggFunc: 'sum',
        valueFormatter: (p: ValueFormatterParams) =>
          p.value.toLocaleString() + ' %',
      },
    ],
    [],
  );

  const defaultColDef = useMemo(() => {
    return {
      suppressHeaderMenuButton: true,
      resizable: false,
      suppressMovable: true,
      sortable: true,
      cellClass: ['no-border', 'flex', 'items-center'],
    };
  }, []);

  const gridOptions = {
    suppressHorizontalScroll: true,
    autoGroupColumnDef: {
      cellRendererParams: {
        totalValueGetter: (params: any) => {
          const isRootLevel = params.node.level === -1;
          if (isRootLevel) {
            return 'Grand Total';
          }
        },
      },
    },
  };

  const handleGridReady = () => {
    setRowData([...incomeData]);
  };

  return (
    <div
      className="self-start w-full h-full space-y-3 shadow-[0_9px_40px_0px_rgba(0,0,0,0.1)]"
      data-testid="annual-estimated-income-table"
    >
      <AgGrid
        rowData={rowData}
        columnDefs={colDefs}
        modules={[RowGroupingModule]}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        onGridReady={handleGridReady}
        grandTotalRow="bottom"
      />
    </div>
  );
};
