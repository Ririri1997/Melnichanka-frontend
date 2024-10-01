import React from "react";
import { Grid, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { clientsActions } from "../../store/slice/clients.slice";

const SearchForm = ({ searchCriteria }) => {
  const dispatch = useDispatch();

  const handleSearchName = (e) => {
   dispatch(clientsActions.setSearchCriteria({ ...searchCriteria, name: e.target.value.toLowerCase() }));
 };
 
 const handleSearchCity = (e) => {
   dispatch(clientsActions.setSearchCriteria({ ...searchCriteria, city: e.target.value.toLowerCase() }));
 };
 
  return (
    <Grid container spacing={2}>
      <Grid item>
        <TextField label="Название" variant="outlined" onChange={handleSearchName} />
      </Grid>
      <Grid item>
        <TextField label="Город" variant="outlined" onChange={handleSearchCity} />
      </Grid>
    </Grid>
  );
};

export default SearchForm;
