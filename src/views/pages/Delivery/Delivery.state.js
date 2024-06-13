export const INITIAL_STATE = {
 factories: [],
 isDisabled: true,
 deliveryType: "",
 inputAddress: "",
 inputFullAdress: '0',
 factoryId: "",
};

export const deliveryReducer = (state, action) => {
 switch (action.type) {
   case "setFactoriesData":
     return { ...state, factories: action.payload };
   case "setDeliveryType":
     return { ...state, deliveryType: action.payload };
   case "setFactoryId":
     return { ...state, factoryId: action.payload };
   case "setInputAddress":
    const fullAdress = action.payload.data.city_with_type+ ', ' + action.payload.data.region_with_type
     return { ...state, inputAddress: action.payload,
      inputFullAdress: fullAdress
      };
   case "setIsDisabled":
     return { ...state, isDisabled: action.payload };
   default:
     return state;
 }
};