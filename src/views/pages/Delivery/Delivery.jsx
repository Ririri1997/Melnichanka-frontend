import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Button } from "@mui/material";
import "react-dadata/dist/react-dadata.css";
import DeliveryTypeSection from "../../../components/DeliveryTypeSection/DeliveryTypeSection";
import SelfDeliverySection from "../../../components/SelfDeliverySection/SelfDeliverySection";
import AutoDeliverySection from "../../../components/AutoDeliverySection/AutoDeliverySection";
import TrainDeliverySection from "../../../components/TrainDeliverySection/TrainDeliverySection";
import { fetchFactories, setIsFormReadyToSubmit } from "../../../store/slice/delivery.slice";
import { setFactoryId, setDeliveryCost, setInputAddress, setDeliveryType } from "../../../store/slice/home.slice";
import "./Delivery.css";

export const Delivery = ({ onCompleteStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { factories, isFormReadyToSubmit, loading, error } = useSelector(state => state.delivery);
  const { deliveryType, factoryId, deliveryCost, inputAddress, inputFullAddress } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(fetchFactories());
  }, [dispatch]);

  useEffect(() => {
    const isSelfDeliveryReady = deliveryType === "self" && factoryId;
    const isAutoDeliveryReady = deliveryType !== "self" && factoryId && deliveryCost && inputFullAddress;
    const isTainDeliveryReady = deliveryType !== "self" && factoryId && deliveryCost;

    if (isSelfDeliveryReady || isTainDeliveryReady || isAutoDeliveryReady) {
      dispatch(setIsFormReadyToSubmit(true));
    } else {
      dispatch(setIsFormReadyToSubmit(false));
    }
  }, [factoryId, deliveryType, deliveryCost, inputFullAddress, dispatch]);

  const handleDeliveryChange = (event) => {
    dispatch(setDeliveryType(event.target.value));
  };

  const handleFactoryChange = (value) => {
    dispatch(setFactoryId(value));
  };

  const handleSelect = (suggestion) => {
    dispatch(setInputAddress(suggestion));
  };

  const handleDeliveryCost = (cost) => {
    dispatch(setDeliveryCost(cost));
  };

  const handleCompleteStep = () => {
    onCompleteStep();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
