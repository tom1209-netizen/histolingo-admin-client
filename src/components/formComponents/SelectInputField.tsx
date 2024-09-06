import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SelectProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
  onChange?: (event: SelectChangeEvent<string>) => void;
  disabled?: boolean;
}

const SelectInputField: React.FC<SelectProps> = ({
  name,
  label,
  control,
  errors,
  options,
  disabled,
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth margin="normal" required error={!!errors[name]}>
      <Controller
        name={name}
        disabled={disabled}
        control={control}
        defaultValue=""
        rules={{
          required: `${label} ${t("selectInputField.validation.required")}`,
        }}
        render={({ field }) => (
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onChange && onChange(e);
            }}
            // value={field.value || ""}
            value={field.value}
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
