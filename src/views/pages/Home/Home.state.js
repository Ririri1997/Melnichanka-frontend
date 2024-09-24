export const INITIAL_STATE = {
 activeStep: 0,
 completed: [false, false, false, false],
 selectedClients: {},
 selectedGoods: [],


 //delivery
 factoryId: "",
 deliveryType: "self",
 inputAddress: 0,
 inputFullAddress: 0,
 deliveryCost: 0,
};

export function homeReducer(state, action) {
 switch (action.type) {
  case "setActiveStep":
   return { ...state, activeStep: action.payload };
  case "setCompleted":
   return { ...state, completed: action.payload };
  case "setSelectedGoods":
   return { ...state, selectedGoods: action.payload };
  case "setSelectedClients":
   return { ...state, selectedClients: action.payload };
  case "setDeliveryType":
   return {
    ...state,
    deliveryType: action.payload,
    factoryId: "",
    inputFullAddress: 0,
    inputAddress: 0,
    deliveryCost: null,
   };
  case "setFactoryId":
   return { ...state, factoryId: action.payload };
  case "setInputFullAddress":
   return { ...state, inputFullAddress: action.payload };
  case "setDeliveryCost":
   return { ...state, deliveryCost: Number(action.payload) };
  case "setInputAddress":
   let fullAddress = 0;
   fullAddress =
    action.payload.data.city_with_type +
    ", " +
    action.payload.data?.region_with_type;
   return {
    ...state,
    inputAddress: action.payload,
    inputFullAddress: fullAddress,
   };

  default:
   throw new Error(`Unhandled action type: ${action.type}`);
 }
}
