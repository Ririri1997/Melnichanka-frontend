import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
 } from "@mui/material";
 import { setDeliveryType } from "../../store/slice/delivery.slice";


 const DeliveryTypeSection = () => {
  const { deliveryType } = useSelector(state => state.delivery);

  const dispatch = useDispatch();
  return (
  <FormControl component="fieldset" fullWidth>
  <FormLabel component="legend">Выбери способ доставки</FormLabel>
  <RadioGroup
    aria-label="delivery"
    name="delivery"
    value={deliveryType}
    onChange={(e)=>{
    dispatch(setDeliveryType(e.target.value));}}
    sx={{ marginBottom: "12px" }}
  >
    <FormControlLabel value="self" control={<Radio />} label="Самовывоз" />
    <FormControlLabel value="auto" control={<Radio />} label="Авто" />
    <FormControlLabel value="train" control={<Radio />} label="ЖД" />
  </RadioGroup>
</FormControl>)
}

export default DeliveryTypeSection;