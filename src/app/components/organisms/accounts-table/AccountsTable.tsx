import {
  ColDef,
  GridReadyEvent,
  RowClassParams,
} from '@ag-grid-community/core';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { useMemo, useState } from 'react';
import { numberFormatter } from 'src/app/common/utils';
import { AgGrid } from 'src/app/components';
import { Button } from '../../ui/button';
import rawData from './mock/data.json';
import { AccountsRow, AssetClassType, PortfolioCategory } from './types';
import { formatRowData } from './utils/formatData';

const ROW_HEIGHT = 55;

const portFolioRenderer = (params: CustomCellRendererProps) => {
  return (
    <div className="flex flex-col justify-center h-full">
      {!params.node.lastChild && (
        <div className="leading-loose">
          <span className="mr-4">
            <Button
              className="text-[#0076be] max-h-0 inline-block px-0 text-xs leading-loose"
              variant="link"
              size="sm"
            >
              {params.data.portfolioName}
            </Button>
          </span>
          <span className="leading-loose">{params.data.portfolioId}</span>
        </div>
      )}
      <div className="leading-loose flex">
        <div>Total:</div>
        <div className="ml-1 mr-4 font-bold leading-loose w-full">
          ${params.data['Totals'].marketValue}
        </div>
        <div className="font-bold leading-loose w-full text-left">
          {params.data['Totals'].percentage}%
        </div>
      </div>
    </div>
  );
};

const assetClassRenderer = (params: CustomCellRendererProps) => {
  const assetClass = params.colDef?.headerName || '';
  const marketValue = numberFormatter(
    params.data[assetClass]?.marketValue || 0,
  );
  const marketValueinFormat = params.node.lastChild
    ? `$${marketValue}`
    : marketValue;
  return (
    <div className="flex gap-[10px] h-full w-full items-center text-left">
      <div className="w-full">{marketValueinFormat}</div>
      <div className="w-full">{params.data[assetClass]?.percentage || 0}%</div>
    </div>
  );
};

const AccountsTable = () => {
  const [rowData, setRowData] = useState<
    (AccountsRow | AssetClassType<Partial<PortfolioCategory>>)[]
  >([]);

  const columnTypes = useMemo(() => {
    return {
      currency: {
        cellRenderer: assetClassRenderer,
      },
    };
  }, []);
  const colDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: 'Accounts',
        cellRenderer: portFolioRenderer,
        pinned: 'left',
        colId: 'accounts',
        width: 250,
      },
      {
        headerName: 'Cash & Equivalents',
        type: 'currency',
      },
      {
        headerName: 'Fixed Income',
        type: 'currency',
      },
      {
        headerName: 'Large Cap U.S. Equities',
        type: 'currency',
      },
      {
        headerName: 'Small/Mid Cap U.S. Equities',
        type: 'currency',
      },
      {
        headerName: 'Multi-Cap U.S. Equities',
        type: 'currency',
      },
      {
        headerName: 'Global/Developed International',
        type: 'currency',
      },
      {
        headerName: 'Emerging Markets',
        type: 'currency',
      },
      {
        headerName: 'Real Estate',
        type: 'currency',
      },
      {
        headerName: 'Credit',
        type: 'currency',
      },
      {
        headerName: 'Private Equities',
        type: 'currency',
      },
      {
        headerName: 'Hedge Funds',
        type: 'currency',
      },
    ],
    [],
  );
  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
    };
  }, []);
  const handleGridReady = (_params: GridReadyEvent) => {
    const rowData = JSON.parse(JSON.stringify(rawData));
    const { formattedTableData: finalRowData, grandTotalRow } =
      formatRowData(rowData);
    setRowData([...finalRowData, grandTotalRow]);
  };
  const rowStyle = (params: RowClassParams) => {
    let style = {};
    if (params.node.lastChild) {
      style = { fontWeight: 'bold' };
    }
    return style;
  };
  return (
    <div className="accounts_table w-full h-full space-y-3 shadow-[0_9px_40px_0px_rgba(0,0,0,0.1)]">
      <AgGrid
        rowData={rowData}
        columnDefs={colDefs}
        onGridReady={handleGridReady}
        rowHeight={ROW_HEIGHT}
        defaultColDef={defaultColDef}
        columnTypes={columnTypes}
        getRowStyle={rowStyle}
      />
    </div>
  );
};

export default AccountsTable;
