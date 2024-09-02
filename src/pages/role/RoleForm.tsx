import { CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { FormLabel } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import NonLocaleInputField from "../../components/formComponents/NonLocaleInputField";
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
import {
  RoleFormProps,
  FormValues,
  FlattenedPermission,
} from "../../interfaces/role.interface";
import { useTranslation } from "react-i18next";
import { LoadingForm } from "../../components/reusable/Loading";

const RoleForm: React.FC<RoleFormProps> = ({ typeOfForm }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const { t } = useTranslation();

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
            "privilege",
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
    const permissions: number[] = data.privilege.map((privilege) => {
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
    console.log(body, "body");
    try {
      if (typeOfForm === "create") {
        const response = await createRole(body);
        if (response.data.success) {
          toast.success(t("toast.createSuccess"));
        } else {
          toast.error(t("toast.error"));
        }
      } else if (typeOfForm === "update" && roleId) {
        const response = await updateRole(roleId, body);
        if (response.data.success) {
          toast.success(t("toast.updateSuccess"));
        } else {
          toast.error(t("toast.error"));
        }
      }
      navigate("/role");
    } catch (error) {
      console.error("Failed to submit role:", error);
      toast.error(t("toast.error"));
    }
  };

  if (loading) {
    return <LoadingForm />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>
        {typeOfForm === "create"
          ? t("createRole.createRole")
          : t("createRole.updateRole")}
      </h1>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="role-name" required>
            {t("createRole.inputFields.roleName")}
          </FormLabel>
          <NonLocaleInputField
            name="roleName"
            minRows={1}
            length={50}
            control={control}
            errors={errors}
            fieldLabel={t("createRole.inputFields.roleName")}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="status" required>
            {t("status")}
          </FormLabel>
          <SelectStatusInputField
            control={control}
            errors={errors}
            activeCompulsory={activeCompulsory}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel id="demo-multiple-chip-label" required>
            {t("createRole.selectPrivileges")}
          </FormLabel>
          <MultiSelectInputField
            label={t("createRole.inputFields.privilege")}
            control={control}
            errors={errors}
            name="privilege"
            options={roles}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}></FormGrid>
        <FormGrid item>
          <CreateButtonGroup nagivateTo={"/role"} typeOfForm={typeOfForm} />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default RoleForm;
