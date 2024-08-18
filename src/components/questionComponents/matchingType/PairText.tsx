import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
interface InputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string;
  language: string;
  length: number;
  index?: number;
  property?: string;
  position: string;
}

const PairText: React.FC<InputFieldProps> = ({
  control,
  errors,
  name,
  length,
  language,
  index,
  property,
  position,
}) => {
  const fieldName = `localeData[${language}][${property}][${index}][${position}]`;
  useEffect(() => {
    console.log("Errors:", errors);
    const fieldError =
      errors?.localeData?.[language]?.[property]?.[index]?.[position];
    console.log(`Error for field ${fieldName}:`, fieldError);
  }, [errors, language, position, index]);

  const fieldError =
    errors?.localeData?.[language]?.[property]?.[index]?.[position];
  return (
    <Controller
      name={fieldName}
      key={fieldName}
      control={control}
      defaultValue=""
      rules={{
        required: `${name} is required`,
        maxLength: {
          value: length,
          message: `${name} must be less than 500 characters`,
        },
        validate: {
            notEmptyOrWhitespace: (value) => {
              const textContent = value.replace(/<[^>]*>/g, '').trim();
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

// import React, { useEffect } from "react";
// import { Control, Controller, FieldErrors } from "react-hook-form";
// import TextField from "@mui/material/TextField";

// interface InputFieldProps {
//   control: Control<any>;
//   errors: FieldErrors<any>;
//   name: string;
//   language: string;
//   length: number;
//   index?: number;
//   position: string;
// }

// const PairText: React.FC<InputFieldProps> = ({
//   control,
//   errors,
//   name,
//   length,
//   language,
//   index,
//   position,
// }) => {
//     const fieldName = `localeData[${language}][${index}][${position}]`;


//   useEffect(() => {
//     console.log("Errors:", errors);
//     const fieldError = errors?.localeData?.[language]?.[index]?.[position];
//     console.log(`Error for field ${fieldName}:`, fieldError);
//   }, [errors, language, position, index]);

//   const fieldError = errors?.localeData?.[language]?.[index]?.[position];

//   return (
//     <Controller
//       name={fieldName}
//     //   key={fieldName}
//       control={control}
//       defaultValue=""
//       rules={{
//         required: `${name} is required`,
//         maxLength: {
//           value: length,
//           message: `${name} must be less than ${length} characters`,
//         },
//         validate: {
//           notEmptyOrWhitespace: (value) => {
//             if (!value.trim()) {
//               return "Cannot be empty or whitespace only";
//             }
//             return true;
//           },
//         },
//       }}
//       render={({ field }) => (
//         <div style={{ margin: "16px 0" }}>
//           <TextField
//             {...field}
//             label={name}
//             variant="outlined"
//             fullWidth
//             error={!!fieldError}
//             helperText={fieldError?.message || ""}
//             placeholder={`Enter ${name}`}
//           />
//         </div>
//       )}
//     />
//   );
// };

// export default PairText;
