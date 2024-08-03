import { Box } from "@mui/material";
import React, { useState } from "react";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import DataTable from "../../components/reusable/Table";
import { GridColDef } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { EditOutlined } from "@mui/icons-material";
import { useRowActions } from "../../hooks/useRowActions";
import { getRolePermissions, getRoles } from "../../api/roles";
import { useEffect } from "react";

const Role = () => {
  const { handleSwitchChange, handleEditRow } = useRowActions();
  const [roles, setRoles] = useState<any[]>([]);
  const [permissionMap, setPermissionMap] = useState<Map<number, string>>(
    new Map()
  );
  const [reversePermissionMap, setReversePermissionMap] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Role name", width: 130 },
    { field: "permissions", headerName: "Permissions", width: 800,  },
    {
      field: "status",
      headerName: "Status",
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={(event) =>
            handleSwitchChange(params.id.toString(), event.target.checked, 
              params.row.name,
              params.row.permissions.split(", ").map((perm: string) =>
                reversePermissionMap.get(perm) || 0
              )
          )
          }
          color="primary"
        />
      ),
    },
    {
      field: "edit",
      headerName: "Edit role",
      width: 70,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditRow(params.id.toString())}
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

  useEffect(() => {
    const fetchRoles = async () => {
      if (permissionMap.size === 0) return; 

      try {
        const rolesResponse = await getRoles();
        const rolesWithNames = rolesResponse.data.data.roles.map((role) => ({
          _id: role._id,
          name: role.name,
          status: role.status === 1,
          permissions: role.permissions
            .map(
              (code: number) => permissionMap.get(code) || `Unknown`
            )
            .join(", "),
        }));

        setRoles(rolesWithNames);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [permissionMap]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Role</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavTabs />
          <SearchField label="Search role" />
        </Box>
        <CreateImportButtonGroup createPath="/createrole" importPath="/" />
      </Box>
      <DataTable columns={columns} rows={roles} getRowId={(row) => row._id} />
    </>
  );
};

export default Role;
