import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CreateImportButtonGroup = ({ createPath }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate(createPath);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button variant="contained" onClick={handleCreateClick}>
        <AddCircleOutlineIcon sx={{ marginRight: "4px" }} />
        {t("createButtonGroup.create")}
      </Button>
    </Box>
  );
};

export default CreateImportButtonGroup;
