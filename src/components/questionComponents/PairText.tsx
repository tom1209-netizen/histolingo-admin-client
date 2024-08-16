import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface InputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  language: string;
  length: number;
  index?: number
  position: string;
}

const PairText: React.FC<InputFieldProps> = ({
  control,
  errors,
  name,
  length,
  language,
  index,
  position
}) => {
  return (
    <Controller
      name={`localeData[${language}][${index}][${position}]`}
      key={`localeData[${language}][${index}][${position}]`}
      control={control}
      defaultValue=""
      rules={{
        required: `${name} is required`,
        maxLength: {
          value: length,
          message: `${name} must be less than 500 characters`,
        },
      }}
      render={({ field }) => (
        <div style={{ margin: "16px 0" }}>
          <ReactQuill
            {...field}
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
            placeholder={`Enter ${name}`}
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
          {errors[name] && (
            <div
              style={{
                color: "#e53935",
                marginTop: "8px",
                fontSize: "13px",
                marginLeft: "10px",
              }}
            >
              {(errors[name] as any)?.message || ""}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default PairText;
