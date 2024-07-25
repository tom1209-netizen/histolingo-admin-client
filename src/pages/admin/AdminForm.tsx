import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { Grid } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import getFormTheme from "../../theme/FormTheme";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const roleOptions = [
  { value: "1", label: "Admin" },
  { value: "2", label: "Analyst" },
  { value: "3", label: "Tester" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const formTheme = createTheme(getFormTheme("light"));
const AdminForm = () => {
  const [role, setRole] = React.useState("");
  const [status, setStatus] = React.useState("active");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <ThemeProvider theme={formTheme}>
      <CssBaseline />
      <h1>Create an admin</h1>
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name (max 50 characters)
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="John"
            autoComplete="first name"
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name (max 50 characters)
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Snow"
            autoComplete="last name"
            required
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="admin-name" required>
            Admin name
          </FormLabel>
          <OutlinedInput
            id="admin-name"
            name="admin-name"
            type="admin-name"
            placeholder="Suggested name"
            autoComplete="admin name"
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="role" required>
            Role
          </FormLabel>
          <Select
            id="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
            label="role"
            placeholder="Select a role"
            autoComplete=""
            required
          >
            {roleOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="status" required>
            Status
          </FormLabel>
          <Select
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
            label="status"
            placeholder="Select a status"
            autoComplete=""
            required
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormGrid>
        <FormGrid item>
          <CreateButtonGroup createPath="/admin" cancelPath="/admin" />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default AdminForm;
