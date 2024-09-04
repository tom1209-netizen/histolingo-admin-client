import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SelectStatusProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  activeCompulsory: boolean;
}

const SelectStatusInputField: React.FC<SelectStatusProps> = ({
  control,
  errors,
  activeCompulsory,
}) => {
  const { t } = useTranslation();

  const statusOptions = [
    { value: 1, label: t("selectStatus.active") },
    { value: 0, label: t("selectStatus.inactive") },
  ];
  return (
    <FormControl fullWidth margin="normal" required error={!!errors.status}>
      <Controller
        name="status"
        control={control}
        defaultValue={1}
        render={({ field }) => (
          <Select
            {...field}
            onChange={(event) => field.onChange(event.target.value)}
            value={field.value ?? 1}
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
