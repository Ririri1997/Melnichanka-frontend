import React, { useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Button } from "@mui/material";
import "react-dadata/dist/react-dadata.css";
import axios from "axios";
import {
 deliveryReducer,
 INITIAL_STATE as deliveryInitialState,
} from "./Delivery.state";
import "./Delivery.css";
import DeliveryTypeSection from "../../../components/DeliveryTypeSection/DeliveryTypeSection";
import SelfDeliverySection from "../../../components/SelfDeliverySection/SelfDeliverySection";
import AutoDeliverySection from "../../../components/AutoDeliverySection/AutoDeliverySection";
import TrainDeliverySection from "../../../components/TrainDeliverySection/TrainDeliverySection";
import { HomeContext } from "../../../context/Home.context";
import { PREFIX } from "../../../helpers/API";
import { getAccessToken } from "../../../utils/authService";


export const Delivery = ({ onSelectRow, onCompleteStep }) => {
 const navigate = useNavigate();
 const { state: homeState, dispatch: homeDispatch } = useContext(HomeContext);
 const [state, dispatch] = useReducer(deliveryReducer, deliveryInitialState);
 const { factories, isFormReadyToSubmit} =
  state;
 const { deliveryType, factoryId, deliveryCost, inputAddress, inputFullAddress  } = homeState;



 useEffect(() => {
  const isSelfDeliveryReady = deliveryType === "self" && factoryId;
  const isAutoDeliveryReady =
   deliveryType !== "self" && factoryId && deliveryCost && inputFullAddress;
  const isTainDeliveryReady =
   deliveryType !== "self" && factoryId && deliveryCost;

  if (isSelfDeliveryReady || isTainDeliveryReady || isAutoDeliveryReady) {
   dispatch({ type: "setIsFormReadyToSubmit", payload: true });
  } else {
   dispatch({ type: "setIsFormReadyToSubmit", payload: false });
  }
 }, [factoryId, deliveryType, deliveryCost, inputFullAddress]);
 const accessToken = getAccessToken();

 useEffect(() => {
  const fetchData = async () => {
   try {
    if (!accessToken) {
     navigate("/login");
     return;
    }
    const { data } = await axios.get(
     `${PREFIX}logistics/factories/`,
     {
      headers: {
       Authorization: `Bearer ${accessToken}`,
       "Content-Type": "application/json",
      },
     }
    );
    dispatch({ type: "setFactoriesData", payload: data });
   } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response && error.response.status === 401) {
     navigate("/login");
    }
   }
  };
  fetchData();
 }, [navigate, accessToken]);

 const handleDeliveryChange = (event) => {
  homeDispatch({ type: "setDeliveryType", payload: event.target.value });
 };

 const handleFactoryChange = (value) => {
  homeDispatch({ type: "setFactoryId", payload: value });
 };

 const handleSelect = (suggestion) => {
  homeDispatch({ type: "setInputAddress", payload: suggestion });
 };

 const handleDeliveryCost = (cost) => {
  homeDispatch({ type: "setDeliveryCost", payload: cost });
 };

 const handleCompleteStep = () => {
  // homeDispatch({ type: "setDeliveryType", payload: deliveryType });
  homeDispatch({ type: "setFactoryId", payload: factoryId });
  homeDispatch({ type: "setInputFullAddress", payload: inputFullAddress });
  onCompleteStep();
 };

 return (
  <CardWrapper
   borderRadius="medium"
   width="medium"
   padding="32px 28px"
   justify="start"
   gap="0px"
  >
   <DeliveryTypeSection
    deliveryType={deliveryType}
    handleDeliveryChange={handleDeliveryChange}
   />
   {deliveryType === "self" && (
    <SelfDeliverySection
     factories={factories}
     handleFactoryChange={handleFactoryChange}
    />
   )}
   {deliveryType === "auto" && (
    <AutoDeliverySection
     factories={factories}
     inputAddress={inputAddress}
     handleFactoryChange={handleFactoryChange}
     handleSelect={handleSelect}
     handleDeliveryCost={handleDeliveryCost}
    />
   )}
   {deliveryType === "train" && (
    <TrainDeliverySection
     factories={factories}
     handleFactoryChange={handleFactoryChange}
     handleDeliveryCost={handleDeliveryCost}
    />
   )}
   <Button
    disabled={!isFormReadyToSubmit}
    variant="contained"
    onClick={handleCompleteStep}
    color="primary"
   >
    {"Продолжить"}
   </Button>
  </CardWrapper>
 );
};

export default Delivery;
