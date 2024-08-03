// src/components/formComponents/MultiSelectInputField.tsx
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  FormHelperText,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { FormControl, InputLabel } from "@mui/material";

interface MultiSelectInputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  options: string[];
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
  name: string,
  selectedNames: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelectInputField: React.FC<MultiSelectInputFieldProps> = ({
  control,
  errors,
  name,
  options,
}) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth margin="normal" required error={!!errors[name]}>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        rules={{
          required: "Please select at least one privilege",
        }}
        render={({ field }) => (
          <>
            <Select
              {...field}
              multiple
              placeholder="Select privileges"
              value={field.value || []}
              onChange={(event) => field.onChange(event.target.value)}
              input={<OutlinedInput id="select-multiple-chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  style={getStyles(option, field.value, theme)}
                >
                  {option}
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

export default MultiSelectInputField;
