import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface NavTabsProps {
  onChange: (value: any) => void;
  value: string;
}
export default function NavTabs({ onChange, value }: NavTabsProps) {
  const { t } = useTranslation();

  return (
    <ToggleButtonGroup size="small" exclusive>
      <ToggleButton
        onClick={() => onChange && onChange("")}
        selected={value === ""}
        value="left"
      >
        {t("navTab.all")}
      </ToggleButton>
      <ToggleButton
        onClick={() => onChange && onChange("1")}
        value="center"
        selected={value === "1"}
      >
        {t("navTab.active")}
      </ToggleButton>
      <ToggleButton
        onClick={() => onChange && onChange("0")}
        value="right"
        selected={value === "0"}
      >
        {t("navTab.inactive")}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
