import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const LocaleTextInputField = ({
  language,
  control,
  errors,
  name,
  length,
  minRows,
  multiline,
  property,
}) => {
  const fieldName = `localeData[${language}][${property}]`;
  const fieldError = errors?.localeData?.[language]?.[property];
  return (
    <Controller
      name={fieldName}
      key={fieldName}
      control={control}
      rules={{
        required: `${name} is required`,
        maxLength: {
          value: length,
          message: `${name} must be less than ${length} characters`,
        },
        validate: {
          notEmptyOrWhitespace: (value) => {
            if (!value.trim()) {
              return "Cannot be empty or whitespace only";
            }
            return true;
          },
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          placeholder={`Enter ${name}`}
          variant="outlined"
          fullWidth
          multiline={multiline}
          minRows={minRows}
          margin="normal"
          inputProps={{ maxLength: length }}
          error={!!fieldError}
          helperText={fieldError ? fieldError.message : ""}
        />
      )}
    />
  );
};

export default LocaleTextInputField;
