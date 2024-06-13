import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Button } from "@mui/material";
import "react-dadata/dist/react-dadata.css";
import axios from "axios";
import { deliveryReducer, INITIAL_STATE } from "./Delivery.state";
import "./Delivery.css";
import DeliveryTypeSection from "../../../components/DeliveryTypeSection/DeliveryTypeSection";
import SelfDeliverySection from "../../../components/SelfDeliverySection/SelfDeliverySection";
import AutoDeliverySection from "../../../components/AutoDeliverySection/AutoDeliverySection";
import TrainDeliverySection from "../../../components/TrainDeliverySection/TrainDeliverySection";

// можно здесь все обернуть в useContext

export const Delivery = ({ railwayStation, onSelectRow, onCompleteStep }) => {
 const navigate = useNavigate();
 const [state, dispatch] = useReducer(deliveryReducer, INITIAL_STATE);
 const {
  factories,
  isDisabled,
  deliveryType,
  inputAddress,
  factoryId,
  deliveryCost,
 } = state;
 console.log(deliveryType);
 console.log(factoryId);
 console.log(inputAddress);
 console.log(deliveryCost);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
     navigate("/login");
     return;
    }

    const { data } = await axios.get(
     "http://145.239.84.6/api/v1/logistics/factories/",
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
 }, [navigate]);

 const handleDeliveryChange = (event) => {
  dispatch({ type: "setDeliveryType", payload: event.target.value });
 };

 const handleFactoryChange = (value) => {
  dispatch({ type: "setFactoryId", payload: value });
  dispatch({ type: "setIsDisabled", payload: false });
 };

 const handleSelect = (suggestion) => {
  dispatch({ type: "setInputAddress", payload: suggestion });
 };
 const handleDeliveryCost = (cost) => {
  dispatch({ type: "setDeliveryCost", payload: cost });
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
     factoryId={factoryId}
     handleFactoryChange={handleFactoryChange}
    />
   )}
   {deliveryType === "auto" && (
    <AutoDeliverySection
     factories={factories}
     factoryId={factoryId}
     inputAddress={inputAddress}
     handleFactoryChange={handleFactoryChange}
     handleSelect={handleSelect}
     handleDeliveryCost={handleDeliveryCost}
    />
   )}
   {deliveryType === "train" && (
    <TrainDeliverySection
     factories={factories}
     factoryId={factoryId}
     railwayStation={railwayStation}
     handleFactoryChange={handleFactoryChange}
     handleDeliveryCost={handleDeliveryCost}
    />
   )}
   <Button
    disabled={isDisabled}
    variant="contained"
    onClick={() => {
     onSelectRow(state);

     onCompleteStep();
    }}
    color="primary"
    sx={{ display: "inline-block" }}
   >
    {"Продолжить"}
   </Button>
  </CardWrapper>
 );
};

export default Delivery;
