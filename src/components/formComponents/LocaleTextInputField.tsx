import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

// This field is used to input text in multiple languages

const LocaleTextInputField = ({
  label,
  language,
  property,
  control,
  errors,
  length,
  minRows,
  multiline,
}) => {
  const { t } = useTranslation();
  const fieldName = `localeData[${language}][${property}]`;
  const fieldError = errors?.localeData?.[language]?.[property];

  return (
    <Controller
      name={fieldName}
      key={fieldName}
      control={control}
      rules={{
        required: `${label} ${t("localeInputField.validation.required")}`,
        validate: {
          notEmptyOrWhitespace: (value) => {
            if (!value.trim()) {
              return t("localeInputField.validation.emptyOrWhitespace");
            }
            return true;
          },
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          placeholder={`${t("localeInputField.placeholder")} ${label}`}
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
