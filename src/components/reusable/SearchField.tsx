import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useDebounce } from "../../hooks/useDebounce";

interface SearchFieldProps {
  label: string;
  onChange?: (value: any) => void;
  delay?: number;
}
const SearchField = ({ label, onChange, delay }: SearchFieldProps) => {
  const debounce = useDebounce(delay || 500);
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (onChange) {
      debounce(() => onChange(event.target.value));
    }
  };
  return (
    <TextField
      size="small"
      id="outlined-search"
      type="search"
      placeholder={`${label}`}
      onChange={handleTextFieldChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
