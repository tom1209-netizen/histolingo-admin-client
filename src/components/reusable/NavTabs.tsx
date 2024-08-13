import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface NavTabsProps {
  onChange: (value: any) => void;
  value: string;
}
export default function NavTabs({ onChange, value }: NavTabsProps) {
  return (
    <ToggleButtonGroup size="small" exclusive>
      <ToggleButton
        onClick={() => onChange && onChange(undefined)}
        value="left"
      >
        All
      </ToggleButton>
      <ToggleButton onClick={() => onChange && onChange("1")} value="center">
        Active
      </ToggleButton>
      <ToggleButton onClick={() => onChange && onChange("0")} value="right">
        Inactive
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
