import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateButtonGroup = ({ typeOfForm, nagivateTo }) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="outlined"
        color="primary"
        type="button"
        onClick={() => navigate(nagivateTo)}
      >
        {t("createButtonGroup.cancel")}
      </Button>
      <Button variant="contained" type="submit">
        { typeOfForm === "create" ? t("createButtonGroup.create") : t("createButtonGroup.update")}
      </Button>
    </Box>
  );
};

export default CreateButtonGroup;
