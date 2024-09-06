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
import { useTranslation } from "react-i18next";

interface SelectProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const TrueFalseInputField: React.FC<SelectProps> = ({
  control,
  errors,
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <FormControl fullWidth margin="normal" required error={!!errors["answer-type-1"]}>
      <Controller
        name="answer-type-1"
        control={control}
        defaultValue=""
        rules={{
          required: t("answerRequired"),
        }}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Select true or false"
            onChange={(e) => {
              field.onChange(e);
              onChange(e);
            }}
            value={field.value || ""}
          >
            <MenuItem value="true">{t("selectTF.true")}</MenuItem>
            <MenuItem value="false">{t("selectTF.false")}</MenuItem>
          </Select>
        )}
      />
      {errors["answer-type-1"] && (
        <FormHelperText>
          {(errors["answer-type-1"] as any)?.message || ""}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TrueFalseInputField;
