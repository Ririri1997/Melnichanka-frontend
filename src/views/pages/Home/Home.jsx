import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Stepper, Step, StepButton } from "@mui/material";
import Header from "../../containers/Header/Header";
import Clients from "../../containers/Clients/Clients";
import Goods from "../Goods/Goods";
import Delivery from "../Delivery/Delivery";
import Download from "../Download/Download";
import { homeActions } from "../../../store/slice/home.slice";


function getSteps() {
  return ["Компании", "Товары", "Способ доставки", "Скачивание"];
}

export const Home = () => {
  const dispatch = useDispatch();
  const { activeStep, completed, selectedGoods, selectedClients, deliveryInfo, deliveryCost } = useSelector(state => state.home);

  const steps = getSteps();
  console.log(selectedGoods);
  const handleComplete = (step) => {
    const newCompleted = [...completed];
    newCompleted[step] = true;
    dispatch(homeActions.setCompleted(newCompleted));


    if (step < steps.length - 1) {
      dispatch(homeActions.setActiveStep(step + 1));
    }
  };

  const handleStep = (step) => {
    dispatch(homeActions.setActiveStep(step));
  };

  const handleRowSelect = (row) => {
    if (activeStep === 0) {
      dispatch(homeActions.setSelectedClients(row));
    }
    if (activeStep === 1) {
      dispatch(homeActions.setSelectedGoods(row));
    }
  };

  return (
    <>
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
    </>
  );
};

export default Home;
