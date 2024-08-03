import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { auto } from "@popperjs/core";
import { createTheme, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/system";
import { EditOutlined } from "@mui/icons-material";
import theme from "../../theme/GlobalCustomTheme";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "status",
    headerName: "Status",
    description:
      "This column allows users to switch the status of the data (aka soft delete).",
    sortable: false,
    width: 90,
    renderCell: (params) => (
      <Switch
        checked={params.value}
        onChange={(event) =>
          handleSwitchChange(params.id, event.target.checked)
        }
        color="primary"
      />
    ),
  },
  {
    field: "delete",
    headerName: "",
    width: 70,
    sortable: false,
    renderCell: (params) => (
      <IconButton
        onClick={() => handleDeleteRow(params.id)}
        color="primary"
        aria-label="delete"
      >
        <EditOutlined />
      </IconButton>
    ),
  },
];

const handleSwitchChange = (id, checked) => {
  console.log(`Row with id ${id} status changed to ${checked}`);
};
const handleDeleteRow = (id) => {
  console.log(`Row with id ${id} deleted`);
};

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status: true },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42, status: false },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, status: true },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, status: false },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: null,
    status: true,
  },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150, status: false },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44, status: true },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36, status: false },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, status: true },
];

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  getRowId?: (row: any) => string | number;
}

export default function DataTable({ columns, rows, getRowId }: DataTableProps) {
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
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={getRowId}
        />
      </div>
    </ThemeProvider>
  );
}
