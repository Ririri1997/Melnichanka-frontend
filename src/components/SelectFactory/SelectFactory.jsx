import React, {useContext} from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { HomeContext } from "../../context/Home.context";
const SelectFactory = ({ handleFactoryChange, factories }) => {


 const { state: homeState } = useContext(HomeContext);
 const {factoryId} = homeState;

 return (
  <Grid item width={"266px"} sx={{ marginTop: "8px" }}>
   <FormControl variant="outlined" fullWidth>
    <InputLabel id="factories">Фабрика</InputLabel>
    <Select
     labelId="factories"
     margin="dense"
     label="Фабрика"
     name="factories"
     value={factoryId || ""}
     onChange={(e) => handleFactoryChange(e.target.value)}
    >
     {factories.map((item, i) => (
      <MenuItem value={item.id} key={i}>
       {item.full_name}
      </MenuItem>
     ))}
    </Select>
   </FormControl>
  </Grid>
 );
};
export default SelectFactory;
