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
        required: t("passwordInputField.validation.required"),
        // minLength: {
        //   value: 8,
        //   message: t("passwordInputField.validation.length"),
        // },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          type="password"
          placeholder={t("passwordInputField.placeholder")}
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
