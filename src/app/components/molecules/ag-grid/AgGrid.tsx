import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact, AgGridReactProps } from '@ag-grid-community/react'; // React Grid Logic
import 'src/assets/ag-grid-theme.css';
import './styles.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type AgGridType = AgGridReactProps & { style?: React.CSSProperties };

export default function AgGrid(props: AgGridType) {
  const {
    rowData,
    columnDefs,
    defaultColDef,
    gridOptions,
    onGridReady,
    style,
  } = props;
  return (
    <div className="ag-theme-custom" style={style}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        onGridReady={onGridReady}
        {...props}
      />
    </div>
  );
}
