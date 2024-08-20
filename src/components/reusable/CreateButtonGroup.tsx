import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CreateButtonGroup = ({ buttonName, nagivateTo }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="outlined"
        color="primary"
        type="button"
        onClick={() => navigate(nagivateTo)}
      >
        Cancel
      </Button>
      <Button variant="contained" type="submit">
        {buttonName}
      </Button>
    </Box>
  );
};

export default CreateButtonGroup;
