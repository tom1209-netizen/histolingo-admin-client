import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
interface NonLocaleInputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  minRows: number;
  length: number;
  fieldLabel: "firstName" | "lastName" | "adminName" | "roleName" | "source";
}

const NonLocaleInputField: React.FC<NonLocaleInputFieldProps> = ({
  control,
  errors,
  length,
  minRows,
  fieldLabel,
}) => {
  const { t } = useTranslation();
  const name = fieldLabel;
  let label: string;

  switch (fieldLabel) {
    case "firstName":
      label = "First name";
      break;
    case "lastName":
      label = "Last name";
      break;
    case "adminName":
      label = "Admin name";
      break;
    case "roleName":
      label = "Role name";
      break;
    case "source":
      label = "Source";
      break;
    default:
      label = "";
  }
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: `${label} ${t("nonLocaleInputField.validation.required")}`,
        // maxLength: {
        //   value: length,
        //   message: `${length} ${t("nonLocaleInputField.validation.maxLength1")} ${length} ${t("nonLocaleInputField.validation.maxLength2")} `,
        // },
        validate: {
          notEmptyOrWhitespace: (value) => {
            if (!value.trim()) {
              return t("nonLocaleInputField.validation.emptyOrWhitespace");
            }
            return true;
          },
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          multiline
          minRows={minRows}
          placeholder={`${t("nonLocaleInputField.placeholder")} ${label}`}
          variant="outlined"
          error={!!errors[name]}
          helperText={(errors[name] as any)?.message || ""}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: length }}
        />
      )}
    />
  );
};

export default NonLocaleInputField;
