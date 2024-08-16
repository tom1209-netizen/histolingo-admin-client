import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { Grid } from "@mui/material";
import { FormLabel } from "@mui/material";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import EmailInputField from "../../components/formComponents/EmailInputField";
import { useForm } from "react-hook-form";
import theme from "../../theme/GlobalCustomTheme";
import NameInputField from "../../components/formComponents/NameInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import { getActiveRoles } from "../../api/roles";
import MultiSelectInputField from "../../components/formComponents/MultiSelectInputField";
import PasswordInputField from "../../components/formComponents/PasswordInputField";
import { createAdmin } from "../../api/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormGrid } from "../../constant/FormGrid";
import { AdminFormProps, FormValues } from "../../interfaces/admin.interface";

const AdminForm: React.FC<AdminFormProps> = ({ typeOfForm, adminData }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const activeCompulsory = typeOfForm === "create";

  const [roles, setRoles] = useState<string[]>([]);
  const [roleOptions, setRoleOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // INITIALLY FETCH ROLES
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getActiveRoles();
        const rolesData = response.data.data.roles;
        setRoles(rolesData.map((role: any) => role.name));
        console.log(roles, "roles")
        setRoleOptions(
          rolesData.map((role) => ({
            value: role._id.toString(),
            label: role.name,
          }))
        );
        console.log(roleOptions, "roleOptions")
        if (typeOfForm === "update" && adminData) {
          const status = adminData.status === 1 ? "active" : "inactive";
          setValue("email", adminData.email);
          setValue("firstName", adminData.firstName);
          setValue("lastName", adminData.lastName);
          setValue("adminName", adminData.adminName);
          setValue("roles", adminData.roles);
          setValue("status", status);
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
    console.log(roleOptions, "roleOptions")
    const roleIds = data.roles
      .map((name) => {
        const role = roleOptions.find((option) => option.label === name);
        return role ? role.value : null;
      })
      .filter((id) => id !== null);

    const status = data.status === "active" ? 1 : 0;
    const body = {
      email: data.email.trim(),
      password: data.password,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      adminName: data.adminName.trim(),
      roles: roleIds,
      status,
    };

    try {
      if (typeOfForm === "create") {
        const response = await createAdmin(body);
        if (response.data.success) {
          toast.success("Admin created successfully.");
          navigate("/admin");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else if (typeOfForm === "update" && adminData) {
        // const response = await updateRole(roleId, body);
        // if (response.data.success) {
        //   toast.success("Role updated successfully.");
        // } else {
        //   toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>{typeOfForm === "create" ? "Create an" : "Update"} admin</h1>
      <Grid
        container
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <NameInputField
            control={control}
            errors={errors}
            fieldLabel="firstName"
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <NameInputField
            control={control}
            errors={errors}
            fieldLabel="lastName"
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="admin-name" required>
            Admin name
          </FormLabel>
          <NameInputField
            control={control}
            errors={errors}
            fieldLabel="adminName"
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="roles" required>
            Role
          </FormLabel>
          <MultiSelectInputField
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
          <FormLabel htmlFor="password" required>
            Password
          </FormLabel>
          <PasswordInputField control={control} errors={errors} />
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

export default AdminForm;
