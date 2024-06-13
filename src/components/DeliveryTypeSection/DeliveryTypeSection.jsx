import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
 } from "@mui/material";

 const DeliveryTypeSection = ({ deliveryType, handleDeliveryChange }) => {
  return (
  <FormControl component="fieldset" fullWidth>
  <FormLabel component="legend">Выбери способ доставки</FormLabel>
  <RadioGroup
    aria-label="delivery"
    name="delivery"
    value={deliveryType}
    onChange={handleDeliveryChange}
    sx={{ marginBottom: "12px" }}
  >
    <FormControlLabel value="self" control={<Radio />} label="Самовывоз" />
    <FormControlLabel value="auto" control={<Radio />} label="Авто" />
    <FormControlLabel value="train" control={<Radio />} label="ЖД" />
  </RadioGroup>
</FormControl>)
}

export default DeliveryTypeSection;