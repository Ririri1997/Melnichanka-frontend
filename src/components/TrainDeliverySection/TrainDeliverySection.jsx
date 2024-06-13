import React from "react";
import { Grid, FormControl, TextField } from "@mui/material";
import SelectFactory from "../SelectFactory/SelectFactory";

const TrainDeliverySection = ({
 factories,
 factoryId,
 railwayStation,
 handleFactoryChange,
 handleDeliveryCost
}) => {
 return (
  <Grid
   container
   justifyContent="space-between"
   gap={"12px"}
   sx={{ marginBottom: "16px" }}
  >
   <SelectFactory
    factoryId={factoryId}
    handleFactoryChange={handleFactoryChange}
    factories={factories}
   />

   <Grid item width={"266px"}>
    <FormControl variant="outlined" fullWidth>
     <TextField
      value={railwayStation}
      fullWidth
      margin="dense"
      label="Станция получения"
      InputProps={{
       readOnly: true,
      }}
     />
    </FormControl>
   </Grid>
   <Grid item width={"266px"}>
    <TextField
     fullWidth
     margin="dense"
     type="number"
     label="Стоимость доставки"
     onChange={(e)=>handleDeliveryCost(e.target.value)}
    />
   </Grid>
  </Grid>
 );
};

export default TrainDeliverySection;
