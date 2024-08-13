import React from 'react';
import { Typography, Box } from '@mui/material';

interface ErrorSummaryProps {
  errors: any;
}

const ErrorSummary: React.FC<ErrorSummaryProps> = ({ errors }) => {
  const errorMessages: string[] = [];

  const extractErrors = (errorsObj: any, path: string = '') => {
    if (typeof errorsObj === 'object') {
      Object.keys(errorsObj).forEach((key) => {
        const value = errorsObj[key];
        if (value?.message) {
          errorMessages.push(`${value.message}`);
        } else {
          extractErrors(value, `${path}${key}.`);
        }
      });
    }
  };

  extractErrors(errors);

  return (
    <Box>
      {errorMessages.length > 0 && (
        <Box mb={2}>
          <Typography color="error">
            {errorMessages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ErrorSummary;
