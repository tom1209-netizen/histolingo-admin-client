import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CreateButtonGroup = ({ createPath, cancelPath }) => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate(createPath);
  };
  const handleCancelClick = () => {
    navigate(cancelPath);
  };
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button variant="outlined" color="primary" onClick={handleCancelClick}>
        Cancel
      </Button>
      <Button variant="contained" onClick={handleCreateClick}>
        Create
      </Button>
    </Box>
  );
};

export default CreateButtonGroup;
