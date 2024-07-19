import React from "react";
import DataTable from "../components/reusable/Table";
import NavTabs from "../components/reusable/NavTabs";
import TextField from "@mui/material/TextField";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';

const Admin = () => {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavTabs />
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined"><PostAddIcon sx={{marginRight: '4px'}}/>Import</Button>
          <Button variant="contained"><AddCircleOutlineIcon sx={{marginRight: '4px'}}/>Create</Button>
        </Box>
      </Box>
      <DataTable />
    </>
  );
};

export default Admin;
