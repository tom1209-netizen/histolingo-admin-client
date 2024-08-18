import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface NavTabsProps {
  onChange: (value: any) => void;
  value: string;
}
export default function NavTabs({ onChange, value }: NavTabsProps) {
  console.log(value, "admin value");
  return (
    <ToggleButtonGroup size="small" exclusive>
      <ToggleButton
        onClick={() => onChange && onChange("")}
        selected={value === ""}
        value="left"
      >
        All
      </ToggleButton>
      <ToggleButton
        onClick={() => onChange && onChange("1")}
        value="center"
        selected={value === "1"}
      >
        Active
      </ToggleButton>
      <ToggleButton
        onClick={() => onChange && onChange("0")}
        value="right"
        selected={value === "0"}
      >
        Inactive
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
