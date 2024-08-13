import React from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface InputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  name: string
}

const MultipleChoiceText: React.FC<InputFieldProps> = ({
  control,
  errors,
  name
}) => {

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: `Answer text is required`,
        maxLength: {
          value: 500,
          message: `Answer text must be less than 500 characters`,
        },
      }}
      render={({ field }) => (
        <div style={{ margin: '16px 0' }}>
          <ReactQuill
            {...field}
            value={field.value || ''}
            onChange={(value) => field.onChange(value)}
            placeholder="Enter answer text"
            modules={{
              toolbar: [
                [{ header: '1'}, { header: '2' }],
                [{ list: 'ordered'}, { list: 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link'],
                [{ align: [] }],
              ],
            }}
          />
          {errors[name] && (
            <div style={{ color: 'red', marginTop: '8px' }}>
              {(errors[name] as any)?.message || ''}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default MultipleChoiceText;
