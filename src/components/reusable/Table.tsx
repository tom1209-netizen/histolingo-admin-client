import { ThemeProvider } from "@mui/system";
import { DataGrid, GridColDef, GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid";
import { auto } from "@popperjs/core";
import * as React from "react";
import theme from "../../theme/GlobalCustomTheme";


interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  rowCount: number;
  onPageChange: (paginationModel: GridPaginationModel) => void;
  paginationModel: GridPaginationModel;
  getRowId?: (row: any) => string | number;
  checkboxSelection?: boolean;
  isLoading?: boolean;
  onSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
  selectedRows?: GridRowSelectionModel;
}

export default function DataTable({
  columns,
  rows,
  paginationModel,
  rowCount,
  onPageChange,
  getRowId,
  checkboxSelection,
  isLoading,
  selectedRows,
  onSelectionModelChange,
}: DataTableProps) {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: auto, width: "100%" }}>
        <DataGrid
        loading={isLoading}
         checkboxSelection={checkboxSelection? true : false}
         rowSelectionModel={selectedRows}
         disableRowSelectionOnClick={true}
         getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200} 
          sx={{
            "& .MuiDataGrid-cell": {
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "4.5rem", 
              maxHeight: "4.5rem",
              padding: "8px",
            },
            "& .MuiDataGrid-row": {
              display: "flex",
              flexDirection: "row",
            },
          }}
          autoHeight
          rows={rows}
          columns={columns}
          pagination
          paginationModel={paginationModel} 
          onPaginationModelChange={(model) => {
            onPageChange(model); 
          }}
          paginationMode="server"
          rowCount={rowCount}
          pageSizeOptions={[10]}
          getRowId={getRowId}
          disableColumnMenu={true}
          keepNonExistentRowsSelected
          onRowSelectionModelChange={(model) => {
            if (onSelectionModelChange) {
              onSelectionModelChange(model); 
            }
          }}
        />
      </div>
    </ThemeProvider>
  );
}
