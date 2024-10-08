import React from "react";
import { Grid, TextField } from "@mui/material";

const SearchForm = ({ searchFields, searchCriteria, setSearchCriteria }) => {
  const handleSearch = (field, value) => {
    setSearchCriteria({ ...searchCriteria, [field]: value.toLowerCase() });
  };
  return (
    <Grid container spacing={2}>
      {searchFields.map((field) => (
        <Grid item key={field.name}>
          <TextField
            label={field.label}
            variant="outlined"
            onChange={(e) => handleSearch(field.name, e.target.value)}
            value={searchCriteria[field.name] || ""}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchForm;
