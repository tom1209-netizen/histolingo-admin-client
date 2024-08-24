import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

const CreateImportButtonGroup = ({ createPath, importPath }) => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate(createPath);
  };
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button variant="contained" onClick={handleCreateClick}>
        <AddCircleOutlineIcon
          sx={{ marginRight: "4px" }}
        />
        Create
      </Button>
    </Box>
  );
};

export default CreateImportButtonGroup;
