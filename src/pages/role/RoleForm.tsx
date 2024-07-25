import {
  Box,
  Chip,
  CssBaseline,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { FormLabel } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import getFormTheme from "../../theme/FormTheme";
import { createTheme } from "@mui/material/styles";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { Theme, useTheme } from "@mui/material/styles";
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "View",
  "Create test",
  "Create admin",
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
  "Option 9",
  "Option 10",
  "Option 11",
  "Option 12",
  "Option 13",
  "Option 14",
  "Option 15",
  "Option 16",
  "Option 17",
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const formTheme = createTheme(getFormTheme("light"));
const RoleForm = () => {
  const [role, setRole] = React.useState("");
  const [status, setStatus] = React.useState("active");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleSelectPrivilegeChange = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <ThemeProvider theme={formTheme}>
      <CssBaseline />
      <h1>Create a role</h1>
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="role-name" required>
            Role name (max 50 characters)
          </FormLabel>
          <Select
            id="role-name"
            name="role-name"
            value={role}
            onChange={handleRoleChange}
            label="role-name"
            placeholder="Select a role name"
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
        <FormGrid item xs={12} md={6}>
          <FormLabel id="demo-multiple-chip-label" required>Select permissons (Multiselect)</FormLabel>
          <Select
            sx={{ maxHeight: "100px", overflow: "auto" }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleSelectPrivilegeChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5,  }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
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
