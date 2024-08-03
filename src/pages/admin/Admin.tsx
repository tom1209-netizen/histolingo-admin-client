import React from "react";
import DataTable from "../../components/reusable/Table";
import NavTabs from "../../components/reusable/NavTabs";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SearchField from "../../components/reusable/SearchField";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";

const Admin = () => {
  return (
    <>
      <h1>Admin Dashboard</h1>
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
          <SearchField label="Search admin" />
        </Box>
        <CreateImportButtonGroup createPath="/createadmin" importPath="/" />
      </Box>
      {/* <DataTable  /> */}
    </>
  );
};

export default Admin;
