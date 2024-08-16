import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const LocaleTextInputField = ({ language, control, errors, name, length, rowHeight, multiline, property}) => {
  return (
    <Controller
      name={`localeData[${language}][${property}]`}
      key={`localeData[${language}][${property}]`}
      control={control}
      rules={{
        required: `${name} is required`,
        maxLength: {
          value: length,
          message: `${name} must be less than ${length} characters`,
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          placeholder={`Enter ${name}`}
          variant="outlined"
          fullWidth
          multiline={multiline}
          rows={rowHeight}
          margin="normal"
          inputProps={{ maxLength: length }}
          error={!!errors.localeData?.[language]?.name}
          helperText={errors.localeData?.[language]?.description?.name}
        />
      )}
    />
  );
};

export default LocaleTextInputField;
