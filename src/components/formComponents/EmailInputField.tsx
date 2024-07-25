import React from "react";
import { TextField } from "@mui/material";
import { Controller, UseFormRegister } from "react-hook-form";

interface EmailInputFieldProps {
  control: any;
  errors: any;
}

const EmailInputField: React.FC<EmailInputFieldProps> = ({
  control,
  errors,
}) => {
  return (
    <Controller
      name="email"
      control={control}
      defaultValue=""
      rules={{
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
          fullWidth
          margin="normal"
        />
      )}
    />
  );
};

export default EmailInputField;
