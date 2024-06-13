import { handleEmailValid, handlePasswordValid } from "../../../utils/formValidations";

export const INITIAL_STATE = {
 isValidText: {
  email: "",
  password: "",
 },
 values: {
  email: "",
  password: "",
 },
 isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
 switch (action.type) {
  case "SET_VALUE":
   return { ...state, values: { ...state.values, ...action.payload } };
  case "SUBMIT": {
   const isEmailValidity = handleEmailValid(action.values.email);
   const isPasswordValidity = handlePasswordValid(action.values.password);
   return {
    ...state,
    isValidText: {
     email: isEmailValidity,
     password: isPasswordValidity,
    },
    isFormReadyToSubmit: !isEmailValidity && !isPasswordValidity,
   };
  }
  default:
   return state;
 }
}