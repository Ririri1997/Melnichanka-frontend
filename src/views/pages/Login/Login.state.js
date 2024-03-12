 import {handleEmailValid,  handlePasswordValid} from '../../../utils/formValidations';


export const INITIAL_STATE = {
 isValidText: {
  email: '', 
  password: '', 
 },
 values: {
  email: '', 
  password: '', 
 },
 isFormReadyToSubmit: false
};

//первое значение это 
//текущее состояние, а второе - это то, что нам нужно сделать
export function formReducer(state, action) {  
 switch(action.type) {
  case 'SET_VALUE':  
   return {...state, values:{ ...state.values, ...action.payload}};

  case 'RESET_VALIDITY':  
   return {...state,  isValidText:  INITIAL_STATE. isValidText};
  case 'CLEAR':  
   return {...state, values:  INITIAL_STATE.values };
  case 'SUBMIT' : {
   const isEmailValidity =  handleEmailValid(action.values.email);
   const isPasswordValidity = handlePasswordValid( action.values.password);
   return{ 
    ...state,
    isValidText: {
     email: isEmailValidity, 
     password: isPasswordValidity,
    },
    isFormReadyToSubmit: !isEmailValidity && !isPasswordValidity
   }
  }
 }
}
