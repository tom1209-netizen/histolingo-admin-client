import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { Grid } from "@mui/material";
import { FormLabel } from "@mui/material";
import { styled } from "@mui/system";
import getFormTheme from "../../theme/FormTheme";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import EmailInputField from "../../components/formComponents/EmailInputField";
import { useForm } from "react-hook-form";
import theme from "../../theme/GlobalCustomTheme";
import NameInputField from "../../components/formComponents/NameInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import SelectInputField from "../../components/formComponents/SelectInputField";
import { roleOptions } from "../../data/roleOptions";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

interface FormValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    adminName: string;
    selectRole: string;
    selectStatus: string;
  }

// const formTheme = createTheme(getFormTheme("light"));

const AdminForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({mode: "onChange"});

    const onSubmit =  (data: FormValues) => {
        console.log("Hi");
    }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Create an admin</h1>
      <Grid container spacing={3} component="form" noValidate
            onSubmit={handleSubmit(onSubmit)}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name (max 50 characters)
          </FormLabel>
          <NameInputField control={control} errors={errors} fieldLabel="firstName" />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name (max 50 characters)
          </FormLabel>
          <NameInputField control={control} errors={errors} fieldLabel="lastName" />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="admin-name" required>
            Admin name
          </FormLabel>
          <NameInputField control={control} errors={errors} fieldLabel="adminName" />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <EmailInputField control={control} errors={errors} />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="role" required>
            Role
          </FormLabel>
          <SelectInputField control={control} errors={errors} name="selectRole" label="Select role" options={roleOptions}/>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="status" required>
            Status
          </FormLabel>
          <SelectStatusInputField control={control} errors={errors} />
        </FormGrid>
        <FormGrid item>
          <CreateButtonGroup createPath="/admin" cancelPath="/admin" />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default AdminForm;
