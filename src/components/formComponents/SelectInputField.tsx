import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

interface SelectProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string; 
  label: string; 
  options: { value: string; label: string }[];
}

const SelectInputField: React.FC<SelectProps> = ({ control, errors, name, label, options }) => {
  return (
    <FormControl fullWidth margin="normal" required error={!!errors[name]}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue="" 
        rules={{
            required: `${label} is required`
        }}
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            onChange={(event) => field.onChange(event.target.value)}
            value={field.value || ""}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[name] && (
        <FormHelperText>{(errors[name] as any)?.message || ''}</FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectInputField;
