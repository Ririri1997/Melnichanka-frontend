import React, { useState } from "react";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Stepper, Step, StepButton } from "@mui/material";
import Header from "../../containers/Header/Header";
import { Clients } from "../../containers/Clients/Clients";
import { Goods } from "../Goods/Goods";
import { Delivery } from "../Delivery/Delivery";
function getSteps() {
 return ["Компании", "Товары", "Способ доставки", "Скачивание"];
}

export const Home = () => {
 const [activeStep, setActiveStep] = useState(0);
 const [completed, setCompleted] = useState([false, false, false, false]);

 const steps = getSteps();


 const handleComplete = (step) => {
  setCompleted((prevCompleted) => {
   const newCompleted = [...prevCompleted];
   newCompleted[step] = true;
   return newCompleted;
  });
  setActiveStep((prevStep) => prevStep + 1);
 };

 const handleRowSelect = (row) => {
  console.log("Selected row:", row);
 };

 return (
  <>
   <Header />
   <CardWrapper
    borderRadius="medium"
    width="medium"
    marginBottom="20px"
    padding="24px 28px"
   >
    <Stepper nonLinear activeStep={activeStep} style={{ width: "100%" }}>
     {steps.map((label, index) => (
      <Step key={label} completed={completed[index]}>
       <StepButton
       // onClick={handleStep(index)} // отвечает за кликабельность элементов степпера
       // completed={completed[index].toString()}
       >
        {label}
       </StepButton>
      </Step>
     ))}
    </Stepper>
   </CardWrapper>
   {activeStep === 0 && (
    <Clients
     onCompleteStep={() => handleComplete(0)}
     onSelectRow={handleRowSelect} />
   )}
   {activeStep === 1 && (
    <Goods
     onCompleteStep={() => handleComplete(1)}
     onSelectRow={handleRowSelect}
    />
   )}
   {activeStep === 2 && <Delivery />}
  </>
 );
};
