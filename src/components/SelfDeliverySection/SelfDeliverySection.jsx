import React from "react";
import { Grid} from "@mui/material";
import SelectFactory from "../SelectFactory/SelectFactory";

const SelfDeliverySection = ({ factories, handleFactoryChange }) => {
  return (
  <Grid
   container
   justifyContent="space-between"
   alignItems="center"
   gap={"12px"}
   sx={{ marginBottom: "20px" }}
  >
   <SelectFactory factories={factories} handleFactoryChange={handleFactoryChange}/>
  </Grid>
 );
};
export default SelfDeliverySection;
