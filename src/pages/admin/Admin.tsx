import React, { useEffect, useState } from "react";
import NavTabs from "../../components/reusable/NavTabs";
import { Box } from "@mui/material";
import SearchField from "../../components/reusable/SearchField";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import { useRowActions } from "../../hooks/useRowActions";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { EditOutlined } from "@mui/icons-material";
import DataTable from "../../components/reusable/Table";
import { getAdmins } from "../../api/admin";
import { useSearchParams } from "react-router-dom";
import { convertSearchParamsToObj } from "../../utils/common";
import { formatTimestamp } from "../../utils/formatTime";

const Admin = () => {
  const { handleSwitchChange, handleEditRow } = useRowActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [admins, setAdmins] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchAdminQuery = convertSearchParamsToObj(searchParams);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const columns: GridColDef[] = [
    { field: "adminName", headerName: "Admin name", width: 200 },
    { field: "roles", headerName: "Roles", width: 200 },
    { field: "supervisorId", headerName: "Supervisor", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 130 },
    { field: "updatedAt", headerName: "Updated At", width: 130 },
    {
      field: "status",
      headerName: "Status",
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => <Switch />,
    },
    {
      field: "edit",
      headerName: "Edit admin",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditRow(params.id.toString(), "admin")}
          color="primary"
          aria-label="delete"
        >
          <EditOutlined />
        </IconButton>
      ),
    },
  ];

  const fetchAdmins = async (page: number, pageSize: number) => {
    try {
      const response = await getAdmins({
        ...searchAdminQuery,
        page: paginationModel.page + 1,
        page_size: paginationModel.pageSize,
      });
      const adminsData = response.data.data.admins;
      const formattedAdminsData = adminsData.map((admin: any) => ({
        ...admin,
        createdAt: admin.createdAt ? formatTimestamp(admin.createdAt) : "N/A",
        updatedAt: admin.updatedAt ? formatTimestamp(admin.updatedAt) : "N/A",
      }));
      const totalRows = response.data.data.totalCount;
      setAdmins(formattedAdminsData);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    fetchAdmins(model.page, model.pageSize);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Admin Dashboard</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavTabs
            onChange={(value: any) =>
              setSearchParams({ ...searchAdminQuery, status: value })
            }
            value=""
          />
          <SearchField
            label="Search admin"
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchAdminQuery, search: value })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createadmin" importPath="/" />
      </Box>
      <DataTable
        columns={columns}
        rows={admins}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Admin;
