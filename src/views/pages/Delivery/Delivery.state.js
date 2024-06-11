export const INITIAL_STATE = {
 factories: [],
 activeFactories: '',
 isDisabled: true,
 deliveryType: "self",
 inputAddress: ''
};

export function deliveryReducer(state, action) {
 switch (action.type) {
  case 'setFactoriesData':
   return { ...state, factories: action.payload };
  case 'setActiveFactories':
   return { ...state, activeFactories: action.payload };
  case 'setIsDisabled':
   return { ...state, isDisabled: action.payload };
   case 'setDeliveryType':
    return { ...state, deliveryType: action.payload };
    case 'setInputAddress':
     return { ...state, inputAddress: action.payload };
 
  default:
   throw new Error();
 }
}