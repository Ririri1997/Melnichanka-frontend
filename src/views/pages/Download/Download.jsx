import React from "react";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { useSelector } from "react-redux";
// можно здесь все обернуть в useContext

export const Download = () => {

 const { factoryId, deliveryCost, inputFullAddress,  } = useSelector(state => state.delivery);
 console.log();
 return (
  <CardWrapper
   borderRadius="medium"
   width="medium"
   padding="32px 28px"
   justify="start"
   gap="0px"
  >
  Download 
  Price:  {deliveryCost}, 
  Factory: {factoryId},
  Full Adress: {inputFullAddress.value}
  </CardWrapper>
 );
};

export default Download;
