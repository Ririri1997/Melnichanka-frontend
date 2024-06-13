import React from "react";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";

// можно здесь все обернуть в useContext

export const Download = () => {

 return (
  <CardWrapper
   borderRadius="medium"
   width="medium"
   padding="32px 28px"
   justify="start"
   gap="0px"
  >
  Download
  </CardWrapper>
 );
};

export default Download;
