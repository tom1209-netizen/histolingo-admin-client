import React from "react";
import { Controller } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";

import ImageUploader from "quill-image-uploader";
import { uploadFile } from "../../api/upload";
import { useTranslation } from "react-i18next";

Quill.register("modules/imageUploader", ImageUploader);

const QuillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["image"],
    [{ align: [] }],
  ],
  imageUploader: {
    upload: async (file) => {
      const response = await uploadFile(file);
      return response.data.data.fileUrl;
    },
  },
};

const QuillTextEditor = ({ language, control, errors, label, property }) => {
  console.log(label, "label");
  const fieldName = `localeData[${language}][${property}]`;
  const fieldError = errors?.localeData?.[language]?.[property];
  const { t } = useTranslation();
  return (
    <Controller
      name={fieldName}
      key={fieldName}
      control={control}
      defaultValue=""
      rules={{
        required: `${label} ${t("localeInputField.validation.required")}`,
      }}
      render={({ field }) => (
        <div style={{ margin: "16px 0" }}>
          <ReactQuill
            {...field}
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
            style={{
              height: "312px",
              marginBottom: "48px",
            }}
            modules={QuillModules}
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
