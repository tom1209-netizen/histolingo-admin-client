import { CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { FormLabel } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import NameInputField from "../../components/formComponents/NameInputField";
import { useForm } from "react-hook-form";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import MultiSelectInputField from "../../components/formComponents/MultiSelectInputField";
import theme from "../../theme/GlobalCustomTheme";
import {
  createRole,
  getIndividualRole,
  getRolePermissions,
  updateRole,
} from "../../api/roles";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormGrid } from "../../constant/FormGrid";
import { RoleFormProps, FormValues, FlattenedPermission } from "../../interfaces/role.interface";


const RoleForm: React.FC<RoleFormProps> = ({ typeOfForm }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const [roles, setRoles] = useState<string[]>([]);
  const [privilegesMap, setRolePrivilegesMap] = useState<Map<string, number>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);

  const { roleId } = useParams<{ roleId?: string }>();

  const activeCompulsory = typeOfForm === "create";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRolePermissions = async () => {
      try {
        const permissionsArray: FlattenedPermission[] =
          await getRolePermissions();
        const roles: string[] = [];
        const privilegesMap = new Map<string, number>();

        permissionsArray.forEach((permission) => {
          const [key, code] = Object.entries(permission)[0];
          roles.push(key);
          privilegesMap.set(key, code);
        });

        setRoles(roles);
        setRolePrivilegesMap(privilegesMap);

        if (typeOfForm === "update" && roleId) {
          const response = await getIndividualRole(roleId);
          const roleData = response.data.data.role;
          const status = roleData.status === 1 ? "active" : "inactive";
          setValue("roleName", roleData.name);
          setValue("status", status);
          setValue(
            "selectPrivilege",
            roleData.permissions.map((code) => {
              const name = Array.from(privilegesMap.entries()).find(
                ([_, val]) => val === code
              )?.[0];
              return name || "";
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRolePermissions();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const permissions: number[] = data.selectPrivilege.map((privilege) => {
      const code = privilegesMap.get(privilege);
      if (code === undefined) {
        throw new Error(`Privilege code not found for ${privilege}`);
      }
      return code;
    });

    const status = data.status === "active" ? 1 : 0;

    const body = {
      permissions,
      name: data.roleName,
      status,
    };

    try {
      if (typeOfForm === "create") {
        const response = await createRole(body);
        if (response.data.success) {
          toast.success("Role created successfully.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else if (typeOfForm === "update" && roleId) {
        const response = await updateRole(roleId, body);
        if (response.data.success) {
          toast.success("Role updated successfully.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
      navigate("/role");
    } catch (error) {
      console.error("Failed to submit role:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>{typeOfForm === "create" ? "Create a" : "Update"} role</h1>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="role-name" required>
            Role name
          </FormLabel>
          <NameInputField
            control={control}
            errors={errors}
            fieldLabel="roleName"
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="status" required>
            Status
          </FormLabel>
          <SelectStatusInputField
            control={control}
            errors={errors}
            activeCompulsory={activeCompulsory}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel id="demo-multiple-chip-label" required>
            Select privileges (Multiselect)
          </FormLabel>
          <MultiSelectInputField
            control={control}
            errors={errors}
            name="privilege"
            options={roles}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}></FormGrid>
        <FormGrid item>
          <CreateButtonGroup
            buttonName={typeOfForm === "create" ? "Create" : "Update"}
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default RoleForm;
