import React from "react";
import { Grid, FormControl, TextField } from "@mui/material";
import {AddressSuggestions} from "react-dadata";
import SelectFactory from "../SelectFactory/SelectFactory";

const AutoDeliverySection = ({ handleFactoryChange, factories, inputAddress, handleSelect, handleDeliveryCost}) => {
 return (
  <Grid
   container
   justifyContent="space-between"
   gap={"12px"}
   sx={{ marginBottom: "16px" }}
  >
 <SelectFactory handleFactoryChange={handleFactoryChange} factories={factories}/> 

   <Grid item width={"266px"}>
    <FormControl variant="outlined" fullWidth>
     <AddressSuggestions
      token="0a6543eb60ae2f3ac3bfe23b841899781f5a5952"
      value={inputAddress || ""}
      onChange={handleSelect}
      filterFromBound="city"
      filterToBound="settlement"
      customInput={React.forwardRef((props, ref) => (
       <TextField
        {...props}
        inputRef={ref}
        fullWidth
        margin="dense"
        label="Город и область получения"
       />
      ))}
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
export default AutoDeliverySection;
