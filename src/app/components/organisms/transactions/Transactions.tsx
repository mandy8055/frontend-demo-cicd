import './styles.css';
// Optional Theme applied to the grid
import { useMemo, useState } from 'react';
import { AgGrid } from '../../../components';
import { transactionData } from './transactionsData';

interface rowType {
  transactionType: string;
  securityName: string;
  transactionDateString: string;
  transactionDate: number;
  tradeAmount: number;
  tradeAmountString: string;
  withdrawalFlag: boolean;
}

export const Transactions = () => {
  const [rowData, setRowData] = useState<rowType[]>([]);

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = useMemo(
    () => [
      { field: 'transactionType', headerName: 'Type' },
      { field: 'securityName', headerName: 'Security', flex: 1 },
      { field: 'transactionDateString', headerName: 'Transaction Date' },
      { field: 'tradeAmountString', headerName: 'Trade Amount' },
    ],
    [],
  );

  const defaultColDef = useMemo(() => {
    return {
      cellStyle: { fontSize: '14px' },
      suppressHeaderMenuButton: true,
      resizable: false,
      suppressMovable: true,
      sortable: false,
      cellClass: ['no-border', 'flex', 'items-center'],
    };
  }, []);

  const gridOptions = {
    rowHeight: 67,
    suppressHorizontalScroll: true,
  };

  const handleGridReady = () => {
    const rowData = transactionData.slice(0, 4);
    setRowData(rowData);
  };

  return (
    <div className="transaction_grid w-full rounded-4 p-6 pl- pb-3 space-y-3 shadow-[0_9px_40px_0px_rgba(0,0,0,0.1)]">
      <p className="text-[#0d233d] text-base font-bold">Recent Transactions</p>
      <AgGrid
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        onGridReady={handleGridReady}
      />
    </div>
  );
};
