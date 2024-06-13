import React, { useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Button } from "@mui/material";
import "react-dadata/dist/react-dadata.css";
import axios from "axios";
import { deliveryReducer, INITIAL_STATE as deliveryInitialState } from "./Delivery.state";
import "./Delivery.css";
import DeliveryTypeSection from "../../../components/DeliveryTypeSection/DeliveryTypeSection";
import SelfDeliverySection from "../../../components/SelfDeliverySection/SelfDeliverySection";
import AutoDeliverySection from "../../../components/AutoDeliverySection/AutoDeliverySection";
import TrainDeliverySection from "../../../components/TrainDeliverySection/TrainDeliverySection";
import { HomeContext } from "../../../context/Home.context";

export const Delivery = ({ onSelectRow, onCompleteStep }) => {
  const navigate = useNavigate();
  const { state: homeState, dispatch: homeDispatch } = useContext(HomeContext);
  const [state, dispatch] = useReducer(deliveryReducer, deliveryInitialState);
  const {
    factories,
    isDisabled,
    // deliveryType,
    inputAddress,
    // factoryId,
    deliveryCost,
    inputFullAddress
  } = state;
  const {deliveryType, factoryId} = homeState;

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
   homeDispatch({ type: "setDeliveryType", payload: event.target.value });
  };

  const handleFactoryChange = (value) => {
   homeDispatch({ type: "setFactoryId", payload: value });

    // dispatch({ type: "setFactoryId", payload: value });
    dispatch({ type: "setIsDisabled", payload: false });
  };

  const handleSelect = (suggestion) => {
    dispatch({ type: "setInputAddress", payload: suggestion });
  };

  const handleDeliveryCost = (cost) => {
   
   homeDispatch({ type: "setDeliveryCost", payload: cost });
    // dispatch({ type: "setDeliveryCost", payload: cost });
  };

  const handleCompleteStep = () => {
    // const { factoryId, deliveryCost } = state;
    // Отправляем данные в Home через глобальный dispatch
    
    homeDispatch({ type: "setDeliveryType", payload: deliveryType });
    homeDispatch({ type: "setFactoryId", payload: factoryId });
    homeDispatch({ type: "setInputFullAddress", payload: inputFullAddress });
    // homeDispatch({ type: "setDeliveryCost", payload: deliveryCost });
    // Выполняем завершение шага в Home
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
        disabled={isDisabled}
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