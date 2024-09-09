import { CssBaseline, FormLabel, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createAdmin,
  getRolesBypassAuthorization,
  updateAdmin,
} from "../../api/admin";
import EmailInputField from "../../components/formComponents/EmailInputField";
import MultiSelectInputField from "../../components/formComponents/MultiSelectInputField";
import NonLocaleInputFieldProps from "../../components/formComponents/NonLocaleInputField";
import PasswordInputField from "../../components/formComponents/PasswordInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { LoadingForm } from "../../components/reusable/Loading";
import { FormGrid } from "../../constant/FormGrid";
import { AdminFormProps, FormValues } from "../../interfaces/admin.interface";
import theme from "../../theme/GlobalCustomTheme";

const AdminForm: React.FC<AdminFormProps> = ({ typeOfForm, adminData }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const activeCompulsory = typeOfForm === "create";
  const [submitting, setSubmitting] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [roleOptions, setRoleOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // INITIALLY FETCH ROLES
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRolesBypassAuthorization();
        const rolesData = response.data.data.roles;
        setRoles(rolesData.map((role: any) => role.name));
        console.log(roles, "roles");
        setRoleOptions(
          rolesData.map((role) => ({
            value: role._id.toString(),
            label: role.name,
          }))
        );
        console.log(roleOptions, "roleOptions");

        if (typeOfForm === "update" && adminData) {
          setValue("email", adminData.email);
          setValue("firstName", adminData.firstName);
          setValue("lastName", adminData.lastName);
          setValue("adminName", adminData.adminName);
          setValue(
            "roles",
            adminData.roles.map((role: any) => role.name)
          );
          setValue("status", adminData.status);
        }
        setLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };
    fetchRoles();
  }, [typeOfForm, adminData, setValue]);

  // SUBMIT FORM
  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    const roleIds = data.roles
      .map((name) => {
        const role = roleOptions.find((option) => option.label === name);
        return role ? role.value : null;
      })
      .filter((id) => id !== null);

    const body = {
      email: data.email.trim(),
      password: data.password,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      adminName: data.adminName.trim(),
      status: 1,
      roles: roleIds,
    };
    console.log(body, "body");

    try {
      if (typeOfForm === "create") {
        const response = await createAdmin(body);
        if (response.data.success) {
          toast.success(t("toast.createSuccess"));
          navigate("/admin");
        }
      } else if (typeOfForm === "update" && adminData) {
        body["status"] = data.status;
        console.log(body, "body updated");
        const response = await updateAdmin(adminData.id, body);
        if (response.data.success) {
          toast.success(t("toast.updateSuccess"));
          navigate("/admin");
        } 
      }
    } catch (error) {
      if (error.toString().includes("Admin is already existed")) {
        console.log("is this called????")
        toast.error("Admin name already exists");
      } else {
        toast.error(t("toast.error"));
      }
    } finally {
      setSubmitting(false);
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
          ? t("createAdmin.createAdmin")
          : t("createAdmin.updateAdmin")}
      </h1>
      <Grid
        container
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            {t("createAdmin.inputFields.firstName")}
          </FormLabel>
          <NonLocaleInputFieldProps
            minRows={1}
            length={50}
            control={control}
            errors={errors}
            name="firstName"
            fieldLabel={t("createAdmin.inputFields.firstName")}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            {t("createAdmin.inputFields.lastName")}
          </FormLabel>
          <NonLocaleInputFieldProps
            name="lastName"
            minRows={1}
            length={50}
            control={control}
            errors={errors}
            fieldLabel={t("createAdmin.inputFields.lastName")}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="admin-name" required>
            {t("createAdmin.inputFields.adminName")}
          </FormLabel>
          <NonLocaleInputFieldProps
            name="adminName"
            minRows={1}
            length={50}
            control={control}
            errors={errors}
            fieldLabel={t("createAdmin.inputFields.adminName")}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="roles" required>
            {t("createAdmin.inputFields.role")}
          </FormLabel>
          <MultiSelectInputField
            label={t("createAdmin.inputFields.role")}
            control={control}
            errors={errors}
            name="roles"
            options={roles}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <EmailInputField control={control} errors={errors} />
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

        {/* {typeOfForm === "create" && (
          <>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="password" required>
                {t("createAdmin.inputFields.password")}
              </FormLabel>
              <PasswordInputField control={control} errors={errors} />
            </FormGrid>
            <FormGrid item xs={12} md={6}></FormGrid>
          </>
        )} */}

        <FormGrid item>
          <CreateButtonGroup
            nagivateTo={"/admin"}
            typeOfForm={typeOfForm}
            isLoading={submitting}
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default AdminForm;
