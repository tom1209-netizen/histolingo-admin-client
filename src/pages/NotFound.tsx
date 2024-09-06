import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>{t("notFound.title")}</h1>
      <Button variant="contained" color="primary" href="/">
        {t("notFound.backToHome")}
      </Button>
    </div>
  );
};

export default NotFound;
