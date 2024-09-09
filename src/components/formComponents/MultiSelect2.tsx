import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface MultiSelectInputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  options: {
    original: any;
    value: string | number;
    label: string | number;
  }[];
  required?: boolean;
  disabled?: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  value: string | number,
  selectedValues: readonly any[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedValues.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelect2: React.FC<MultiSelectInputFieldProps> = ({
  control,
  errors,
  name,
  required = true,
  options,
  disabled
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  console.log(options);
  
  return (
    <FormControl fullWidth margin="normal" required error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        defaultValue={[]}
        rules={
          required
            ? {
                required: `${t(
                  "multiSelectFieldInput.validation.required"
                )} ${name}`,
              }
            : undefined
        }
        render={({ field }) => (
          <>
            <Select
              {...field}
              multiple
              value={field.value || []}
              onChange={(event) => field.onChange(event.target.value)}
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip key={index} label={options.find((option) => option.value == value )?.label} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.value}
                  style={getStyles(option.value, field.value, theme)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors[name] && (
              <FormHelperText error>
                {(errors[name] as any)?.message || ""}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default MultiSelect2;
