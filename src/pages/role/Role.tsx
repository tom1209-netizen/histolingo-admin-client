import { EditOutlined } from "@mui/icons-material";
import { Box, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getRolePermissions,
  getRoles,
  switchRoleStatus,
} from "../../api/roles";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import { LoadingTable } from "../../components/reusable/Loading";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import DataTable from "../../components/reusable/Table";
import { useRowActions } from "../../hooks/useRowActions";
import { convertSearchParamsToObj } from "../../utils/common";
import { formatTimestamp } from "../../utils/formatTime";
import { DataContext } from "../../components/layouts/ProfileContext";
import { rolePrivileges } from "../../constant/rolePrivileges";

const Role = () => {
  const { t } = useTranslation();
  const { handleEditRow } = useRowActions();
  const [roles, setRoles] = useState<any[]>([]);
  const [permissionMap, setPermissionMap] = useState<Map<number, string>>(
    new Map()
  );
  const [reversePermissionMap, setReversePermissionMap] = useState<
    Map<string, number>
  >(new Map());
  const [loading, setLoading] = useState<boolean>(true);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRoleQuery: any = convertSearchParamsToObj(searchParams);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("Component must be used within a DataProvider");
  }
  const { profileData } = context;

  const handleStatusChange = async (id: any, status: any) => {
    setLoadingStatus(true);
    try {
      const response = await switchRoleStatus(id, status);
      if (response.status === 200) {
        toast.success(t("toast.switchStatusSuccess"));
        fetchRoles(paginationModel.page, paginationModel.pageSize);
      } else {
        toast.error(t("toast.switchStatusFail"));
      }
    } catch (error) {
      toast.error(t("toast.switchStatusFail"));
    } finally {
      setLoadingStatus(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: t("roleDashboard.table.roleName"),
      flex: 1,
      sortable: false,
    },
    {
      field: "permissions",
      headerName: t("roleDashboard.table.permission"),
      flex: 4,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: t("createdAt"),
      flex: 1,
      sortable: false,
    },
    {
      field: "updatedAt",
      headerName: t("updatedAt"),
      flex: 1,
      sortable: false,
    },
    {
      field: "status",
      headerName: t("status"),
      flex: 0,
      sortable: false,
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 100,
      renderCell: (params) =>
        profileData?.permissions.includes(rolePrivileges.role.delete) ? (
          <Switch
            disabled={loadingStatus}
            defaultChecked={params.row.status == 1}
            onChange={() =>
              handleStatusChange(
                params.row._id,
                params.row.status === 1 ? 0 : 1
              )
            }
          />
        ) : null,
    },
    {
      field: "edit",
      headerName: t("edit"),
      width: 90,
      align: "center",
      flex: 0,
      sortable: false,
      renderCell: (params) =>
        profileData?.permissions.includes(rolePrivileges.role.update) ? (
          <IconButton
            onClick={() => handleEditRow(params.id.toString(), "role")}
            color="primary"
            aria-label="edit"
          >
            <EditOutlined />
          </IconButton>
        ) : null,
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
    setIsTableLoading(true);
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
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams, permissionMap]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  if (loading) {
    return <LoadingTable />;
  }

  return (
    <>
      <h1>{t("roleDashboard.title")}</h1>
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
            label={`${t("search")} ${t("roleDashboard.role")}`}
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchRoleQuery, search: value.trim() })
            }
          />
        </Box>
        {profileData?.permissions.includes(rolePrivileges.role.create) && (
          <CreateImportButtonGroup createPath="/createrole" />
        )}
      </Box>
      <DataTable
        isLoading={isTableLoading}
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
