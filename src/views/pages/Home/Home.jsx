
import React, { useReducer } from "react";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Stepper, Step, StepButton } from "@mui/material";
import Header from "../../containers/Header/Header";
import { Clients } from "../../containers/Clients/Clients";
import { Goods } from "../Goods/Goods";
import { Delivery } from "../Delivery/Delivery";
import { INITIAL_STATE, homeReducer } from "./Home.state";
import Download from "../Download/Download";
import { HomeContext } from "../../../context/Home.context";

function getSteps() {
  return ["Компании", "Товары", "Способ доставки", "Скачивание"];
}

export const Home = () => {
  const [state, dispatch] = useReducer(homeReducer, INITIAL_STATE);
  const { activeStep, completed, selectedGoods, selectedClients, deliveryInfo, deliveryCost, inputFullAddress, factoryId, deliveryType} = state;
  const ids = selectedGoods.map(item => item.id);
 const sendData = {
  "delivery_type": deliveryType,
  "client_id": selectedClients.id,
  "items": [],
    "factory_id": factoryId,
    "destination": inputFullAddress,
    "delivery_cost": deliveryCost
 }

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
    if (activeStep === 0) {
      dispatch({ type: "setSelectedClients", payload: row});
    }
    if (activeStep === 1) {
      dispatch({ type: "setSelectedGoods", payload: row});
      console.log(row);
    }
  };


  return (
    <HomeContext.Provider value={{ state, dispatch }}>
      <Header />
      <CardWrapper borderRadius="medium" width="medium" marginBottom="20px" padding="24px 28px">
        <Stepper nonLinear activeStep={activeStep} style={{ width: "100%" }}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton onClick={() => handleStep(index)} completed={completed[index] ? "true" : undefined}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </CardWrapper>
      {activeStep === 0 && (
        <Clients onCompleteStep={() => handleComplete(0)} onSelectRow={handleRowSelect} />
      )}
      {activeStep === 1 && (
        <Goods onCompleteStep={() => handleComplete(1)} onSelectRow={handleRowSelect} />
      )}
      {activeStep === 2 && (
        <Delivery onCompleteStep={() => handleComplete(2)} />
      )}
      {activeStep === 3 && (
        <Download
          selectedGoods={selectedGoods}
          selectedClients={selectedClients}
          deliveryInfo={deliveryInfo}
        />
      )}
    </HomeContext.Provider>
  );
};

export default Home;