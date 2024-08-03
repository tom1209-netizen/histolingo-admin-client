import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
interface SelectStatusProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  activeCompulsory: boolean;
}

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const SelectStatusInputField: React.FC<SelectStatusProps> = ({ control, errors, activeCompulsory}) => {
  return (
    <FormControl fullWidth margin="normal" required error={!!errors.status}>
      <Controller
        name="status"
        control={control}
        defaultValue="active" 
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Select status"
            onChange={(event) => field.onChange(event.target.value)}
            value={field.value || "active"} 
            disabled={activeCompulsory}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.status && (
        <FormHelperText>{(errors.status as any)?.message || ""}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectStatusInputField;
