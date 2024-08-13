import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";

interface SelectProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const MultipleChoiceAnswer: React.FC<SelectProps> = ({
  control,
  errors,
  onChange,
}) => {
  return (
    <FormControl fullWidth margin="normal" required error={!!errors["answer"]}>
      <Controller
        name="answer"
        control={control}
        defaultValue=""
        rules={{
          required: `Answer is required`,
        }}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Select correct answer"
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
            value={field.value || undefined}
          >
            <MenuItem value={0}>A</MenuItem>
            <MenuItem value={1}>B</MenuItem>
            <MenuItem value={2}>C</MenuItem>
            <MenuItem value={3}>D</MenuItem>
            
          </Select>
        )}
      />
      {errors["answer"] && (
        <FormHelperText>
          {(errors["answer"] as any)?.message || ""}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default MultipleChoiceAnswer;
