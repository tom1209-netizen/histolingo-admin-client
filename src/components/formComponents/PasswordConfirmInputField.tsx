import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface PasswordConfirmationInputFieldProps {
  control: any;
  errors: any;
  passwordValue: string;
}

const PasswordConfirmationInputField: React.FC<
  PasswordConfirmationInputFieldProps
> = ({ control, errors, passwordValue }) => {
  return (
    <Controller
      name="passwordConfirmation"
      control={control}
      defaultValue=""
      rules={{
        required: "Password confirmation is required",
        validate: (value) => value === passwordValue || "Passwords must match",
      }}
      render={({ field }) => (
        <TextField
          {...field}
          type="password"
          label="Confirm Password"
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
