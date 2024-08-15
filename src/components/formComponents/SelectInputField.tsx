import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";

interface SelectProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  onChange: (event: SelectChangeEvent<string>) => void;
  disabled?: boolean;
}


const SelectInputField: React.FC<SelectProps> = ({
  control,
  errors,
  name,
  label,
  options,
  onChange
}) => {
  return (
    <FormControl fullWidth margin="normal" required error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{
          required: `${label} is required`,
        }}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Select role"
            onChange={(e) => {
              field.onChange(e); // Ensure react-hook-form value is updated
              onChange(e); // Call the passed onChange handler
            }}
            value={field.value || ""}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[name] && (
        <FormHelperText>{(errors[name] as any)?.message || ""}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInputField;
