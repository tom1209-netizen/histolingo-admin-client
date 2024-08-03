import React from 'react'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next';

interface EmailInputFieldProps {
    control: any;
    errors: any;
}

const EmailInputField: React.FC<EmailInputFieldProps> = ({ control, errors }) => {
  const { t } = useTranslation();
  return (
    <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: t("validation.email.required"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("validation.email.invalid"),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  fullWidth
                  margin="normal"
                />
              )}
            />
  )
}

export default EmailInputField