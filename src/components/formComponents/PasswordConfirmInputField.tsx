import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PasswordConfirmationInputFieldProps {
  control: any;
  errors: any;
  passwordValue: string;
}

const PasswordConfirmationInputField: React.FC<
  PasswordConfirmationInputFieldProps
> = ({ control, errors, passwordValue }) => {
  const { t } = useTranslation();
  return (
    <Controller
      name="passwordConfirmation"
      control={control}
      defaultValue=""
      rules={{
        required: t("validation.confirmPassword.required"),
        validate: (value) => value === passwordValue || t("validation.confirmPassword.mustMatch"),
      }}
      render={({ field }) => (
        <TextField
          {...field}
          type="password"
          label={t("validation.confirmPassword.label")}
          variant="outlined"
          error={!!errors.passwordConfirmation}
          helperText={
            errors.passwordConfirmation
              ? errors.passwordConfirmation.message
              : ""
          }
          fullWidth
          margin="normal"
        />
      )}
    />
  );
};

export default PasswordConfirmationInputField;
