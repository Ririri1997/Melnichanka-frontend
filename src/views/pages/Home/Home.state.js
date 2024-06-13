// export const INITIAL_STATE = {
//  activeStep: 0,
//  completed: [false, false, false, false],
//  deliveryType: "self",
//  inputFullAddress: 0,
//  factoryId: "",
//  deliveryCost: 0,
//  selectedGoods: [],
//  selectedClients: [],
// };
// export function homeReducer(state, action) {
//  switch (action.type) {
//   case "setActiveStep":
//    return { ...state, activeStep: action.payload };
//   case "setCompleted":
//    return { ...state, completed: action.payload };
//    case "setRailwayStation":
//     return { ...state, railwayStation: action.payload };
//   default:
//    throw new Error();
//  }
// }
export const INITIAL_STATE = {
 activeStep: 0,
 completed: [false, false, false, false],
 selectedClients: [],
 selectedGoods: [],
 //delivery
 factoryId: "",
 deliveryType: "",
 inputFullAddress: 0,
 deliveryCost: 0,
 railwayStation: null,
};

export function homeReducer(state, action) {
 switch (action.type) {
  case "setActiveStep":
   return { ...state, activeStep: action.payload };
  case "setCompleted":
   return { ...state, completed: action.payload };
  case "setRailwayStation":
   return { ...state, railwayStation: action.payload };
  case "setSelectedGoods":
   return { ...state, selectedGoods: action.payload };
  case "setSelectedClients":
   return { ...state, selectedClients: action.payload };

  case "setDeliveryType":
   return { ...state, deliveryType: action.payload };
  case "setFactoryId":
   return { ...state, factoryId: action.payload };
  case "setInputFullAddress":
   return { ...state, inputFullAddress: action.payload };
  case "setDeliveryCost":
   return { ...state, deliveryCost: action.payload };

  default:
   throw new Error(`Unhandled action type: ${action.type}`);
 }
}
