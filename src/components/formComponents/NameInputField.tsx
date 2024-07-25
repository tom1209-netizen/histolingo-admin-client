import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
interface NameInputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  fieldLabel: "firstName" | "lastName" | "adminName" | "roleName";
}

const NameInputField: React.FC<NameInputFieldProps> = ({
  control,
  errors,
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
          value: 50,
          message: `${label} must be less than 50 characters`,
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          error={!!errors[name]}
          helperText={(errors[name] as any)?.message || ''}
          fullWidth
          margin="normal"
        />
      )}
    />
  );
};

export default NameInputField;
