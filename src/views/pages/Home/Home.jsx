import React, { useReducer } from "react";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Stepper, Step, StepButton } from "@mui/material";
import Header from "../../containers/Header/Header";
import { Clients } from "../../containers/Clients/Clients";
import { Goods } from "../Goods/Goods";
import { Delivery } from "../Delivery/Delivery";
import { INITIAL_STATE, homeReducer } from "./Home.state";

function getSteps() {
 return ["Компании", "Товары", "Способ доставки", "Скачивание"];
}

export const Home = () => {
 const [state, dispatch] = useReducer(homeReducer, INITIAL_STATE);
 const { activeStep, completed, railwayStation } = state;

 const steps = getSteps();

 const handleComplete = (step) => {
  const newCompleted = [...completed];
  newCompleted[step] = true;

  dispatch({ type: "setCompleted", payload: newCompleted });

  if (step < steps.length - 1) {
   dispatch({ type: "setActiveStep", payload: step + 1 });
  }
 };

 const handleStep = (step) => {
  dispatch({ type: "setActiveStep", payload: step });
 };

 const handleRowSelect = (row) => {
  console.log("Selected row:", row);
  if(activeStep === 0){
   dispatch({ type: "setRailwayStation", payload: row.railway_station });
   console.log(railwayStation);

  }
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
        onClick={() => handleStep(index)}
        completed={completed[index] ? "true" : undefined}
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
     onSelectRow={handleRowSelect}
    />
   )}
   {activeStep === 1 && (
    <Goods
     onCompleteStep={() => handleComplete(1)}
     onSelectRow={handleRowSelect}
    />
   )}
   {activeStep === 2 && <Delivery railwayStation={railwayStation}/>}
  </>
 );
};
