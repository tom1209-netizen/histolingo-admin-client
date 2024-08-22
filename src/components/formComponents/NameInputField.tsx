import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
interface NameInputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  minRows: number;
  length: number;
  fieldLabel: "firstName" | "lastName" | "adminName" | "roleName" | "source";
}

const NameInputField: React.FC<NameInputFieldProps> = ({
  control,
  errors,
  length,
  minRows,
  fieldLabel,
}) => {
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
        required: `${label} is required`,
        maxLength: {
          value: length,
          message: `${length} must be less than ${length} characters`,
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
          multiline
          minRows={minRows}
          placeholder={`Enter ${label}`}
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

export default NameInputField;
