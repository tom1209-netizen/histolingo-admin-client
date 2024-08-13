import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
interface DescriptionInputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
}

const DescriptionInputField: React.FC<DescriptionInputFieldProps> = ({
  control,
  errors,
}) => {

  return (
    <Controller
      name="description"
      control={control}
      defaultValue=""
      rules={{
        required: `Description is required`,
        maxLength: {
          value: 1500,
          message: `Description must be less than 1500 characters`,
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          multiline
          placeholder="Enter description"
          variant="outlined"
          error={!!errors.description}
          helperText={(errors.description as any)?.message || ''}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 1500 }}
        />
      )}
    />
  );
};

export default DescriptionInputField;
