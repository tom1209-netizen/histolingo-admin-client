import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PasswordInputFieldProps {
  control: any;
  errors: any;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  control,
  errors,
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      name="password"
      control={control}
      defaultValue=""
      rules={{
        required: t("validation.password.required"),
        minLength: {
          value: 6,
          message: t("validation.password.minLength"),
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          type="password"
          label={t("validation.password.label")}
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          fullWidth
          margin="normal"
        />
      )}
    />
  );
};

export default PasswordInputField;
