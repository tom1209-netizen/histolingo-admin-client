import { EditOutlined } from "@mui/icons-material";
import { Box, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAdmins, switchAdminStatus } from "../../api/admin";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import DataTable from "../../components/reusable/Table";
import { useRowActions } from "../../hooks/useRowActions";
import { convertSearchParamsToObj } from "../../utils/common";
import { formatTimestamp } from "../../utils/formatTime";
import { LoadingTable } from "../../components/reusable/Loading";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();
  const { handleEditRow } = useRowActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [admins, setAdmins] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchAdminQuery: any = convertSearchParamsToObj(searchParams);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const handleStatusChange = async (id: any, status: any) => {
    const response = await switchAdminStatus(id, status);
    console.log(response, "response");
    console.log(response);
    if (response.status === 200) {
      toast.success(t("toast.switchStatusSuccess"));
      fetchAdmins(paginationModel.page, paginationModel.pageSize);
    } else {
      toast.error(t("toast.switchStatusFail"));
    }
  };

  const columns: GridColDef[] = [
    {
      field: "adminName",
      headerName: t("adminDashboard.table.adminName"),
      flex: 1,
      sortable: false,
    },
    {
      field: "roles",
      headerName: t("adminDashboard.table.role"),
      flex: 1,
      sortable: false,
      valueGetter: (value, row) => row.role.name.join(", "),
    },
    { field: "email", headerName: "Email", flex: 1, sortable: false },
    {
      field: "supervisorId",
      headerName: t("adminDashboard.table.supervisor"),
      flex: 1,
      valueGetter: (value, row) => row.supervisorId.adminName,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: t("adminDashboard.table.createdAt"),
      flex: 1,
      sortable: false,
    },
    {
      field: "updatedAt",
      headerName: t("adminDashboard.table.updatedAt"),
      flex: 1,
      sortable: false,
    },
    {
      field: "status",
      flex: 0,
      headerName: t("adminDashboard.table.status"),
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      sortable: false,
      renderCell: (params) => {
        return (
          <Switch
            defaultChecked={params.row.status == 1}
            onChange={() => {
              console.log(params.row.status, "current status");
              handleStatusChange(
                params.row._id,
                params.row.status === 1 ? 0 : 1
              );
            }}
          />
        );
      },
    },
    {
      field: "edit",
      headerName: t("adminDashboard.table.edit"),
      width: 100,
      sortable: false,
      flex: 0,
      align: "center",
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
    setIsTableLoading(true);
    try {
      const response = await getAdmins({
        ...searchAdminQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const adminsData = response.data.data.admins;
      console.log(adminsData);
      const formattedAdminsData = adminsData.map((admin: any) => ({
        ...admin,
        createdAt: admin.createdAt ? formatTimestamp(admin.createdAt) : "N/A",
        updatedAt: admin.updatedAt ? formatTimestamp(admin.updatedAt) : "N/A",
      }));
      const totalRows = response.data.data.totalCount;
      setAdmins(formattedAdminsData);
      console.log(formattedAdminsData);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  if (loading) {
    return <LoadingTable />;
  }

  return (
    <>
      <h1>{t("adminDashboard.title")}</h1>
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
            value={searchAdminQuery.status || ""}
          />
          <SearchField
            label={`${t("search")} ${t("admin")}`}
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchAdminQuery, search: value.trim() })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createadmin" />
      </Box>
      <DataTable
        isLoading={isTableLoading}
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
