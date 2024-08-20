import { Box } from "@mui/material";
import React, { useState } from "react";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import DataTable from "../../components/reusable/Table";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { EditOutlined } from "@mui/icons-material";
import { useRowActions } from "../../hooks/useRowActions";
import {
  getRolePermissions,
  getRoles,
  switchRoleStatus,
} from "../../api/roles";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { convertSearchParamsToObj } from "../../utils/common";
import { LoadingTable } from "../../components/reusable/Loading";
import { toast } from "react-toastify";
import { formatTimestamp } from "../../utils/formatTime";

const Role = () => {
  const { handleSwitchChange, handleEditRow } = useRowActions();
  const [roles, setRoles] = useState<any[]>([]);
  const [permissionMap, setPermissionMap] = useState<Map<number, string>>(
    new Map()
  );
  const [reversePermissionMap, setReversePermissionMap] = useState<
    Map<string, number>
  >(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRoleQuery: any = convertSearchParamsToObj(searchParams);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const handleStatusChange = async (id: any, status: any) => {
    const response = await switchRoleStatus(id, status);
    console.log(response);
    if (response.status === 200) {
      toast.success("Status changed successfully");
    } else {
      toast.error("Failed to change status. Please try again.");
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Role name", flex: 1, sortable: false },
    {
      field: "permissions",
      headerName: "Permissions",
      flex: 4,
      sortable: false,
    },
    { field: "createdAt", headerName: "Created At", flex: 1, sortable: false },
    { field: "updatedAt", headerName: "Updated At", flex: 1, sortable: false },
    {
      field: "status",
      headerName: "Status",
      flex: 0,
      sortable: false,
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 100,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.status == 1}
          onChange={() =>
            handleStatusChange(params.row._id, params.row.status == 1 ? 0 : 1)
          }
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit role",
      width: 90,
      align: "center",
      flex: 0,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditRow(params.id.toString(), "role")}
          color="primary"
          aria-label="delete"
        >
          <EditOutlined />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const permissionsArray = await getRolePermissions();
        const permissionsMap = new Map<number, string>();
        const reversePermissionMap = new Map<string, number>();

        permissionsArray.forEach((permission: { [key: string]: number }) => {
          const [name, code] = Object.entries(permission)[0];
          permissionsMap.set(code, name);
          reversePermissionMap.set(name, code);
        });
        setPermissionMap(permissionsMap);
        setReversePermissionMap(reversePermissionMap);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPermissions();
  }, []);

  const fetchRoles = async (page: number, pageSize: number) => {
    if (permissionMap.size === 0) return;
    try {
      const rolesResponse = await getRoles({
        ...searchRoleQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const rolesWithNames = rolesResponse.data.data.roles.map((role) => ({
        _id: role._id,
        name: role.name,
        createdAt: role.createdAt ? formatTimestamp(role.createdAt) : "N/A",
        updatedAt: role.updatedAt ? formatTimestamp(role.updatedAt) : "N/A",
        status: role.status,
        permissions: role.permissions
          .map((code: number) => permissionMap.get(code) || `Unknown`)
          .join(", "),
      }));
      const totalRows = rolesResponse.data.data.totalRoles;
      setRoles(rolesWithNames);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams, permissionMap]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    fetchRoles(model.page, model.pageSize);
  };

  if (loading) {
    return <LoadingTable />;
  }

  return (
    <>
      <h1>Role Dashboard</h1>
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
              setSearchParams({ ...searchRoleQuery, status: value })
            }
            value={searchRoleQuery.status || ""}
          />
          <SearchField
            label="Search role"
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchRoleQuery, search: value })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createrole" importPath="/" />
      </Box>
      <DataTable
        columns={columns}
        rows={roles}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Role;
