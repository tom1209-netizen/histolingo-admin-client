import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";

const QuillTextEditor = ({
  language,
  control,
  errors,
  name,
  property,
}) => {
  const fieldName = `localeData[${language}][${property}]`;
  const fieldError = errors?.localeData?.[language]?.[property];
  return (
    <Controller
    name={fieldName}
    key={fieldName}
    control={control}
    defaultValue=""
    rules={{
      required: `${name} is required`,
      validate: {
        notEmptyOrWhitespace: (value) => {
          const textContent = value.replace(/<[^>]*>/g, "").trim();
          if (!textContent) {
            return "Cannot be empty or whitespace only";
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
          placeholder={`Enter ${name}`}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              ["link"],
              [{ color: [] }, { background: [] }],
              ["image"],
              [{ align: [] }],
            ],
          }}
          style={{
            height: "312px", 
            marginBottom: "48px",
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
            {fieldError.message ? fieldError.message : ""}
          </div>
        )}
      </div>
    )}
  />
  );
};

export default QuillTextEditor;