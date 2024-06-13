export const INITIAL_STATE = {
 factories: [],
 isDisabled: true,
 // deliveryType: "self",
 inputAddress: 0,
 inputFullAddress: 0,
 factoryId: "",
 deliveryCost: 0,
};

export const deliveryReducer = (state, action) => {
 switch (action.type) {
  case "setFactoriesData":
   return { ...state, factories: action.payload };
  // case "setDeliveryType":
  //  return { ...INITIAL_STATE,
  //   factories: state.factories,
  //   deliveryType: action.payload };
  case "setFactoryId":
   return { ...state, factoryId: action.payload };
  case "setInputAddress":
   let fullAddress = 0;
    fullAddress =action.payload.data.city_with_type +
     ", " +
     action.payload.data?.region_with_type 
   return {
    ...state,
    inputAddress: action.payload,
    inputFullAddress: fullAddress 
   };
  case "setIsDisabled":
   return { ...state, isDisabled: action.payload };
   case "setDeliveryCost":
    return { ...state, deliveryCost: Number(action.payload) };
  default:
   return state;
 }
};
