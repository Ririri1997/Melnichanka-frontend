import {  handleEmptyField, handleFullName, handlePasswordMatch, handlePasswordValid, handleEmailValid } from '../../../utils/formValidations';

// handleEmptyField, 
export const INITIAL_STATE = {
 isValidText: {
  client_name : '',
  destination_city: '',
  position: '',
  contract_number: '',
  contract_date: '', 
  director_name: '', 
  director_position: '',
  last_application_number: '',
 },
 values: {
  client_name : '',
  destination_city: '',
  position: '',
  contract_number: '',
  contract_date: '', 
  director_name: '', 
  director_position: '',
  last_application_number: '',
 },
 isFormReadyToSubmit: false
};


export function formReducer(state, action) {  
 switch(action.type) {
  case 'SET_VALUE':  
   return {...state, values:{ ...state.values, ...action.payload}};
  case 'RESET_VALIDITY':  
   return {...state,  isValidText:  INITIAL_STATE. isValidText};
  case 'CLEAR':  
   return {...state, values:  INITIAL_STATE.values };
  case 'SUBMIT' : {
   const isClientName = handleEmptyField(action.values.client_name);

   return{ 
    ...state,
    isValidText: {
     client_name : isClientName,
    },
    isFormReadyToSubmit: !isClientName,
   }
  }
 }
}
