import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, FieldErrors, useController } from 'react-hook-form';

interface UploadFileProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  initialImageUrl?: string;
}

const DropzoneWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '355px',
  border: '2px dashed #ccc',
  borderRadius: '8px',
  overflow: 'hidden',
  background: '#f9f9f9',
  padding: 0,
  marginTop: '1rem',
  textAlign: 'center',
  cursor: 'pointer',
});

const ImagePreview = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

const ErrorMessage = styled('div')({
  color: 'red',
  fontSize: '0.875rem',
  marginTop: '0.5rem',
});

const UploadFile: React.FC<UploadFileProps> = ({ control, errors, initialImageUrl }) => {
    const theme = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const {
    field: { onChange, onBlur, value, name, ref },
    fieldState: { error },
  } = useController({
    name: 'image',
    control,
    rules: { required: 'Image is required' }, 
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onChange(file); 
    },
  });

  useEffect(() => {
    if (initialImageUrl) {
      setImage(initialImageUrl); // Set initial image from URL
    }
  }, [initialImageUrl]);

  return (
    <DropzoneWrapper {...getRootProps()}>
      {image ? (
        <ImagePreview src={image} alt="Uploaded preview" />
      ) : (
        <div>
          <input
            {...getInputProps({
              onBlur: () => onBlur(), 
              ref: ref, 
              onChange: (e) => {
                onChange(e.target.files?.[0]); 
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                      setImage(reader.result);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              },
            })}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
          <div style={{backgroundColor: theme.palette.primary.main, color: 'white', padding: '8px 16px', borderRadius: '5px'}}>Drop a file here, or click to select a file</div>
        </div>
      )}
      {error && (
        <ErrorMessage>{error.message}</ErrorMessage>
      )}
    </DropzoneWrapper>
    
  );
};

export default UploadFile;
