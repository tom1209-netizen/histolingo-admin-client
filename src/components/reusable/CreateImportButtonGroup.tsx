import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CreateImportButtonGroup = () => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button variant="outlined">
        <PostAddIcon sx={{ marginRight: "4px" }} />
        Import
      </Button>
      <Button variant="contained">
        <AddCircleOutlineIcon sx={{ marginRight: "4px" }} />
        Create
      </Button>
    </Box>
  );
};

export default CreateImportButtonGroup;
