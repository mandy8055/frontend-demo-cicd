import {
  GridApi,
  GridReadyEvent,
  IAggFuncParams,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
} from '@ag-grid-community/core';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { amountToNum, numberFormatter } from 'src/app/common/utils';
import { AgGrid } from 'src/app/components';
import mockedRowData from './mock/private-equity-data.json';
import type { PEImperativeHandle, PrivateEquityData } from './types';

const aggSum = (params: IAggFuncParams) => {
  let total = 0;
  params.values.forEach((value) => {
    const valueConverted = isNaN(+value) ? amountToNum(value) : parseInt(value);
    total += valueConverted;
  });
  return numberFormatter(total, 'en-US');
};

export const PrivateEquityTable = forwardRef<PEImperativeHandle>(
  (props, ref) => {
    const [rowData, setRowData] = useState<PrivateEquityData[]>([]);
    const gridApi = useRef<GridApi<PrivateEquityData>>();

    const expandAll = () => {
      gridApi.current?.expandAll();
    };
    const collapseAll = () => {
      gridApi.current?.collapseAll();
    };

    useImperativeHandle(
      ref,
      () => ({
        expand: expandAll,
        collapse: collapseAll,
      }),
      [],
    );

    const colDefs = useMemo(
      () => [
        {
          headerName: 'Sector',
          field: 'sector',
          rowGroup: true,
          hide: true,
        },
        {
          headerName: 'Commitment',
          field: 'commitment',
          aggFunc: aggSum,
          suppressAggFuncInHeader: true,
        },
        {
          headerName: 'Paid In Capital',
          field: 'paidInCapital',
          aggFunc: aggSum,
          suppressAggFuncInHeader: true,
        },
        {
          headerName: 'IRR',
          field: 'iRR',
          aggFunc: aggSum,
          suppressAggFuncInHeader: true,
        },
        {
          headerName: 'Multiple',
          field: 'multiple',
          aggFunc: aggSum,
          suppressAggFuncInHeader: true,
        },
        {
          headerName: 'Total Investment Value',
          field: 'totalInvestmentValue',
          aggFunc: aggSum,
          suppressAggFuncInHeader: true,
        },
      ],
      [],
    );

    const defaultColDef = useMemo(() => {
      return {
        suppressHeaderMenuButton: true,
        resizable: false,
        suppressAggFuncInHeader: true,
        suppressMovable: true,
        sortable: true,
        cellClass: ['no-border', 'flex', 'items-center'],
        wrapHeaderText: true,
      };
    }, []);

    const gridOptions = {
      suppressHorizontalScroll: true,
      rowSelection: 'multiple' as const,
      suppressAggFuncInHeader: true,
      checkboxSelection: true,
      animateRows: false,
      groupUseEntireRow: true,
    };

    const handleGridReady = (params: GridReadyEvent) => {
      gridApi.current = params.api;
      const data = JSON.parse(JSON.stringify(mockedRowData));
      setRowData([...data]);
    };

    const autoSizeStrategy = useMemo<
      | SizeColumnsToFitGridStrategy
      | SizeColumnsToFitProvidedWidthStrategy
      | SizeColumnsToContentStrategy
    >(() => {
      return {
        type: 'fitGridWidth',
        defaultMinWidth: 30,
        columnLimits: [
          {
            colId: 'name',
            minWidth: 280,
          },
        ],
      };
    }, []);

    const autoGroupColumnDef = useMemo(() => {
      return {
        headerName: 'Fund Vintage Year',
        minWidth: 200,
        cellRendererParams: {
          suppressCount: true,
          checkbox: false,
        },
        field: 'investor',
      };
    }, []);

    return (
      <div
        data-testid="private-equity-table"
        className="grow private_equity_grid w-full h-full space-y-3 shadow-[0_9px_40px_0px_rgba(0,0,0,0.1)]"
      >
        <AgGrid
          rowData={rowData}
          columnDefs={colDefs}
          modules={[RowGroupingModule]}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
          grandTotalRow="bottom"
          onGridReady={handleGridReady}
          autoSizeStrategy={autoSizeStrategy}
          groupAllowUnbalanced
          domLayout="autoHeight"
          autoGroupColumnDef={autoGroupColumnDef}
        />
      </div>
    );
  },
);
