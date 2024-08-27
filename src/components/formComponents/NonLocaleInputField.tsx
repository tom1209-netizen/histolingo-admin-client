import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
interface NonLocaleInputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  multiline?: boolean;
  minRows: number;
  length?: number;
  fieldLabel: string;
  name: string;
}

const NonLocaleInputField: React.FC<NonLocaleInputFieldProps> = ({
  control,
  errors,
  multiline,
  length,
  minRows,
  name,
  fieldLabel,
}) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: `${fieldLabel} ${t(
          "nonLocaleInputField.validation.required"
        )}`,
        validate: {
          notEmptyOrWhitespace: (value) => {
            if (!value.trim()) {
              return t("nonLocaleInputField.validation.emptyOrWhitespace");
            }
            return true;
          },
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          multiline={multiline}
          minRows={minRows}
          placeholder={`${t("nonLocaleInputField.placeholder")} ${fieldLabel}`}
          variant="outlined"
          error={!!errors[name]}
          helperText={(errors[name] as any)?.message || ""}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: length }}
        />
      )}
    />
  );
};

export default NonLocaleInputField;
