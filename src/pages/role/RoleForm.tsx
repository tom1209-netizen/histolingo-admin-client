import {CssBaseline} from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { FormLabel } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import NameInputField from "../../components/formComponents/NameInputField";
import { useForm } from "react-hook-form";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import MultiSelectInputField from "../../components/formComponents/MultiSelectInputField";
import { multiSelectOptions } from "../../data/roleOptions";
import theme from "../../theme/GlobalCustomTheme";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

interface FormValues {
  roleName: string;
  status: string;
  selectPrivilege: string[];
}

const RoleForm = () => {
  const onSubmit = (data: FormValues) => {
    console.log("Hi");
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onChange" });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Create a role</h1>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="role-name" required>
            Role name (max 50 characters)
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
          <SelectStatusInputField control={control} errors={errors} />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel id="demo-multiple-chip-label" required>
            Select privileges (Multiselect)
          </FormLabel>
          <MultiSelectInputField
            control={control}
            errors={errors}
            name="selectPrivilege"
            label="Select privileges"
            options={multiSelectOptions}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}></FormGrid>
        <FormGrid item>
          <CreateButtonGroup createPath="/role" cancelPath="/role" />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default RoleForm;
