import * as React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function NavTabs() {
  return (
    <ToggleButtonGroup size="small" exclusive>
      <ToggleButton value="left">All</ToggleButton>
      <ToggleButton value="center">Active</ToggleButton>
      <ToggleButton value="right">Inactive</ToggleButton>
    </ToggleButtonGroup>
  );
}
