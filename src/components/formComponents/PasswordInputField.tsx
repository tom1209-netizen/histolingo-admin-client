import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface PasswordInputFieldProps {
  control: any;
  errors: any;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  control,
  errors,
}) => {
  return (
    <Controller
      name="password"
      control={control}
      defaultValue=""
      rules={{
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          type="password"
          label="Password"
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
