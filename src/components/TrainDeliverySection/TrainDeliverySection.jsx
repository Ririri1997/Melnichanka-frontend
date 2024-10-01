import React from "react";
import { Grid, FormControl, TextField } from "@mui/material";
import SelectFactory from "../SelectFactory/SelectFactory";
import { useSelector } from "react-redux"; // Импортируем useSelector для доступа к состоянию

const TrainDeliverySection = ({
 factories,
 handleFactoryChange,
 handleDeliveryCost
}) => {
 const { selectedClients } = useSelector((state) => state.home);

 return (
  <Grid
   container
   justifyContent="space-between"
   gap={"12px"}
   sx={{ marginBottom: "16px" }}
  >
   <SelectFactory
    handleFactoryChange={handleFactoryChange}
    factories={factories}
   />

   <Grid item width={"266px"}>
    <FormControl variant="outlined" fullWidth>
     <TextField
      value={selectedClients.railway_station}
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
     onChange={(e)=>{ handleDeliveryCost(e.target.value)
     }}
    />
   </Grid>
  </Grid>
 );
};

export default TrainDeliverySection;
