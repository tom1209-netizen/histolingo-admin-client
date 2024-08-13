import * as React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { auto } from "@popperjs/core";
import { createTheme, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/system";
import { EditOutlined } from "@mui/icons-material";
import theme from "../../theme/GlobalCustomTheme";

const handleSwitchChange = (id, checked) => {
  console.log(`Row with id ${id} status changed to ${checked}`);
};
const handleDeleteRow = (id) => {
  console.log(`Row with id ${id} deleted`);
};

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  rowCount: number;
  onPageChange: (paginationModel: GridPaginationModel) => void;
  paginationModel: GridPaginationModel;
  getRowId?: (row: any) => string | number;
}

export default function DataTable({
  columns,
  rows,
  paginationModel,
  rowCount,
  onPageChange,
  getRowId,
}: DataTableProps) {
  const [page, setPage] = React.useState<number>(0);
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: auto, width: "100%" }}>
        <DataGrid
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
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
          paginationModel={paginationModel} // Ensure this is up-to-date
          onPaginationModelChange={(model) => {
            onPageChange(model); // Ensure this updates page correctly
          }}
          paginationMode="server"
          rowCount={rowCount}
          // initialState={{
          //   pagination: {
          //     paginationModel: { page: 0, pageSize: 10 },
          //   },
          // }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={getRowId}
        />
      </div>
    </ThemeProvider>
  );
}
