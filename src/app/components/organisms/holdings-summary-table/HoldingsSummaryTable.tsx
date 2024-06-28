// Optional Theme applied to the grid
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  InitialGroupOrderComparatorParams,
  RowClassParams,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  ValueFormatterParams,
  ValueGetterParams,
} from '@ag-grid-community/core';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { format } from 'date-fns';
import { forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react';
import { useAppSelector } from 'src/app/common/hooks';
import { findPercentage, numberFormatter } from 'src/app/common/utils';
import { AgGrid } from 'src/app/components';
import { selectDate } from 'src/app/store/slices/dateSlice';
import { useGetHoldingsQuery } from 'src/app/store/slices/holdingsSlice';
import { selectPortfolio } from 'src/app/store/slices/portfolioSlice';
import './styles.css';
import {
  HoldingsImperativeHandle,
  HoldingsSummaryData,
  HoldingsSummaryGridData,
} from './types';

const reportingCurrencyStyle = 'bg-[#869AFE]';
const localCurrencyStyle = 'bg-[#ebaf58]';
const HoldingsSummaryTable = forwardRef<
  HoldingsImperativeHandle,
  { isMultiCurrency: boolean }
>((props, ref) => {
  const selectedPortfolios = useAppSelector(selectPortfolio);
  const selectedDate = useAppSelector(selectDate);
  const holdingsReqBody = {
    portfolioIds: selectedPortfolios,
    reportDate: format(selectedDate, 'yyyy-MM-dd'),
  };
  const { data } = useGetHoldingsQuery(holdingsReqBody);
  const { isMultiCurrency } = props;
  const gridApi = useRef<GridApi<HoldingsSummaryGridData>>();

  const expandAll = () => {
    const defaultColDefs = gridApi.current?.getGridOption('defaultColDef');
    gridApi.current?.expandAll();
    gridApi.current?.updateGridOptions({
      defaultColDef: { ...defaultColDefs, cellStyle: { alignItems: 'start' } },
    });
  };
  const collapseAll = () => {
    const defaultColDefs = gridApi.current?.getGridOption('defaultColDef');
    gridApi.current?.collapseAll();
    gridApi.current?.updateGridOptions({
      defaultColDef: { ...defaultColDefs, cellStyle: { alignItems: 'center' } },
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      expand: expandAll,
      collapse: collapseAll,
    }),
    [],
  );

  // Column Definitions: Defines the columns to be displayed.

  const defaultColDef = useMemo(() => {
    return {
      suppressHeaderMenuButton: true,
      resizable: false,
      suppressMovable: true,
      sortable: false,
      cellStyle: {
        border: 'none',
        display: 'flex',
        alignItems: 'center',
      },
      wrapHeaderText: true,
    };
  }, []);
  const getRowClass = (params: RowClassParams) => {
    return params.data?.isTotalRow || params.node.group ? 'font-bold' : '';
  };

  const categoryPercentageGetter = (
    params: ValueGetterParams<HoldingsSummaryData>,
  ) => {
    /*this function is used to calculate and populate category percentage for each group node, for leaf node it takes the value from row data as is*/
    if (params.node?.group) {
      const selfMarketValue = params.node.aggData?.marketValue;
      const parentMarketValue = params.node.parent?.aggData?.marketValue;
      if (params.node.level === 0) {
        const totalMarketValue = data?.totalMarketValue || 1;
        return findPercentage(selfMarketValue, totalMarketValue);
      }
      return findPercentage(selfMarketValue, parentMarketValue);
    }
    return params.data?.interestPercentage;
  };

  const yieldGetter = (
    params: ValueGetterParams<HoldingsSummaryData, number>,
  ) => {
    /*this function is used to calculate and populate yield for group nodes*/
    if (params.node?.group) {
      const annualIncome = params.node.aggData?.annualIncome;
      const totalCost = params.node.aggData?.marketValue;
      return findPercentage(annualIncome, totalCost);
    }
    return params.data?.yield;
  };
  const initialGroupOrderComparator = (
    params: InitialGroupOrderComparatorParams,
  ) => {
    const { nodeA, nodeB } = params;
    if (nodeA.group && !nodeB.group) {
      return -1;
    } else if (!nodeA.group && nodeB.group) {
      return 1;
    }
    return 0;
  };

  const currencyFormatter = (
    params: ValueFormatterParams<HoldingsSummaryData, number>,
  ) => {
    if (!params.value && params?.data?.isTotalRow) {
      return '';
    }
    const roundedOffValue = Math.round(params.value || 0);
    const formattedValue = numberFormatter(roundedOffValue);
    return formattedValue;
  };

  const securityRenderer = (
    params: CustomCellRendererProps<HoldingsSummaryData>,
  ) => {
    const securityName = params.data?.securityName;
    const interestText = params.data?.interestText;
    const accruedInterest = params.data?.accruedInterestFlag;
    return (
      <div className="space-y-2">
        <div>{securityName}</div>
        {!!interestText && <div className="text-black">{interestText}</div>}
        {accruedInterest && <div>Accrued Interest</div>}
      </div>
    );
  };
  const marketValueRenderer = (
    params: CustomCellRendererProps<HoldingsSummaryData>,
  ) => {
    if (params.node.group) {
      return numberFormatter(Math.round(params.node.aggData.marketValue));
    }
    const securityMarketValue = numberFormatter(
      Math.round(params.data?.marketValue || 0),
    );
    const accruedInterestValue = numberFormatter(
      Math.round(params.data?.accruedInterestMarketValue || 0),
    );
    const accruedInterest = params.data?.accruedInterestFlag;
    const styleClass = accruedInterest
      ? 'flex flex-col justify-between h-full'
      : '';
    return (
      <div className={styleClass}>
        <div>{securityMarketValue}</div>
        {accruedInterest && <div>{accruedInterestValue}</div>}
      </div>
    );
  };

  const normalColDefs: ColDef<HoldingsSummaryData>[] = [
    { field: 'securityAssetClassName', rowGroup: true, hide: true },
    { field: 'securitySubAssetClassName', rowGroup: true, hide: true },
    { field: 'securityGroupName', rowGroup: true, hide: true },
    { field: 'securitySectorName', rowGroup: true, hide: true },
    {
      field: 'securityName',
      headerName: 'Security',
      cellStyle: {
        color: '#0076be',
        whiteSpace: 'normal',
        lineHeight: '20px',
      },
      autoHeight: true,
      cellRenderer: securityRenderer,
    },
    {
      field: 'totalAdjustedCost',
      headerName: 'Total Cost',
      aggFunc: 'sum',
      valueFormatter: currencyFormatter,
    },
    { field: 'price', headerName: 'Price' },
    {
      field: 'marketValue',
      headerName: 'Market Value',
      aggFunc: 'sum',
      cellRenderer: marketValueRenderer,
    },
    {
      field: 'interestPercentage',
      headerName: 'Categ.',
      valueGetter: categoryPercentageGetter,
    },
    {
      field: 'unrealizedGainLoss',
      headerName: 'Unrealized Gain/Loss',
      aggFunc: 'sum',
      valueFormatter: currencyFormatter,
    },
    {
      field: 'annualIncome',
      headerName: 'Annual Income',
      aggFunc: 'sum',
      valueFormatter: currencyFormatter,
    },
    {
      field: 'yield',
      headerName: 'Yield',
      valueGetter: yieldGetter,
    },
  ];
  const multiCurrencyColDefs = [
    { field: 'securityAssetClassName', rowGroup: true, hide: true },
    { field: 'securitySubAssetClassName', rowGroup: true, hide: true },
    { field: 'securityGroupName', rowGroup: true, hide: true },
    { field: 'securitySectorName', rowGroup: true, hide: true },
    {
      field: 'securityName',
      headerName: 'Security',
      cellStyle: {
        color: '#0076be',
        whiteSpace: 'normal',
        lineHeight: '20px',
      },
      autoHeight: true,
      cellRenderer: securityRenderer,
    },
    {
      field: 'principalCurrencyISOCode',
      headerName: 'ISO Code',
      headerClass: localCurrencyStyle,
    },
    {
      field: 'localUnitCost',
      headerName: 'Unit Cost',
      headerClass: localCurrencyStyle,
    },
    {
      field: 'localPrice',
      headerName: 'Price (As of Date)',
      headerClass: localCurrencyStyle,
    },
    {
      field: 'totalAdjustedCost',
      headerName: 'Book Cost',
      aggFunc: 'sum',
      valueFormatter: currencyFormatter,
      headerClass: reportingCurrencyStyle,
    },
    {
      field: 'marketValue',
      headerName: 'Market Value',
      aggFunc: 'sum',
      valueFormatter: currencyFormatter,
      headerClass: reportingCurrencyStyle,
      cellRenderer: marketValueRenderer,
    },
    {
      field: 'categoryPer',
      headerName: 'Categ.',
      valueGetter: categoryPercentageGetter,
      headerClass: reportingCurrencyStyle,
    },
    {
      field: 'unrealizedGainLoss',
      headerName: 'Unrealized Gain/Loss',
      aggFunc: 'sum',
      valueFormatter: currencyFormatter,
      headerClass: reportingCurrencyStyle,
    },
    {
      field: 'annualIncome',
      headerName: 'Annual Income',
      aggFunc: 'sum',
      valueFormatter: currencyFormatter,
      headerClass: reportingCurrencyStyle,
    },
    {
      field: 'yield',
      headerName: 'Yield',
      valueGetter: yieldGetter,
      headerClass: reportingCurrencyStyle,
    },
  ];

  const gridOptions = {
    suppressAggFuncInHeader: true,
    animateRows: false,
    rowHeight: 50,
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
          minWidth: 180,
        },
        {
          colId: 'unrealisedGainLossValue',
          minWidth: 80,
        },
        { colId: 'marketValue', minWidth: 80 },
        {
          colId: 'totalCost',
          minWidth: 80,
        },
        {
          colId: 'annualIncome',
          minWidth: 80,
        },
        {
          colId: 'principalCurrencyISOCode',
          minWidth: 80,
        },
        {
          colId: 'localUnitCost',
          minWidth: 80,
        },
        {
          colId: 'localPrice',
          minWidth: 80,
        },
      ],
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Quantity',
      minWidth: 200,
      cellRendererParams: {
        suppressCount: true,
        checkbox: false,
      },
      field: 'quantity',
      cellStyle: {
        whiteSpace: 'normal',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
      },
      cellDataType: false,
    };
  }, []);

  const handleGridReady = (params: GridReadyEvent) => {
    gridApi.current = params.api;
  };

  return (
    <div className="holdings_summary_grid w-full h-full space-y-3 shadow-[0_9px_40px_0px_rgba(0,0,0,0.1)]">
      <AgGrid
        rowData={data?.rows}
        columnDefs={isMultiCurrency ? multiCurrencyColDefs : normalColDefs}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        onGridReady={handleGridReady}
        autoSizeStrategy={autoSizeStrategy}
        modules={[RowGroupingModule]}
        domLayout="normal"
        groupAllowUnbalanced
        autoGroupColumnDef={autoGroupColumnDef}
        initialGroupOrderComparator={initialGroupOrderComparator}
        getRowClass={getRowClass}
        style={{ height: '500px' }}
      />
    </div>
  );
});

export default memo(HoldingsSummaryTable);
