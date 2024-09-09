import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface InputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  label: string;
  language: string;
  length: number;
  index?: number;
  property?: string;
  position: string;
}

const PairText: React.FC<InputFieldProps> = ({
  control,
  errors,
  label,
  length,
  language,
  index,
  property,
  position,
}) => {
  const { t } = useTranslation();
  const fieldName = `localeData[${language}][${property}][${index}][${position}]`;
  const fieldError =
    errors?.localeData?.[language]?.[property]?.[index]?.[position];
  return (
    <Controller
      name={fieldName}
      key={fieldName}
      control={control}
      defaultValue=""
      rules={{
        required: `${label} ${t("localeInputField.validation.required")}`,
        maxLength: {
          value: length,
          message: `${label} ${t("localeInputField.validation.maxLength1")} ${length} ${t("localeInputField.validation.maxLength2")}`,
        },
        validate: {
          notEmptyOrWhitespace: (value) => {
            const textContent = value.replace(/<[^>]*>/g, "").trim();
            if (!textContent) {
              return t("localeInputField.validation.emptyOrWhitespace");
            }
            return true;
          },
        },
      }}
      render={({ field }) => (
        <div style={{ margin: "16px 0" }}>
          <ReactQuill
            {...field}
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
            placeholder={`${t("localeInputField.placeholder")} ${label}`}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link"],
                [{ align: [] }],
              ],
            }}
          />
          {fieldError && (
            <div
              style={{
                color: "#e53935",
                marginTop: "8px",
                fontSize: "13px",
                marginLeft: "10px",
              }}
            >
              {(fieldError as any)?.message || ""}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default PairText;
