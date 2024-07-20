import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

interface SearchFieldProps {
  label: string;
}
const SearchField = ({ label }: SearchFieldProps) => {
  return (
    <TextField
      size="small"
      id="outlined-search"
      label={label}
      type="search"
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
