import {  handleEmptyField } from '../../utils/formValidations';

// handleEmptyField, 
export const INITIAL_STATE = {
 isValidText: {
  client_name : '',
  destination_city: '',
  contract_number: '',
  contract_date: '', 
  director_name: '', 
  director_position: '',
  last_application_number: '',
 },
 values: {
  client_name : '',
  destination_city: '',
  contract_number: '',
  contract_date: new Date().toISOString().split('T')[0], 
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
  case 'SUBMIT': {
   const isClientName = handleEmptyField(action.values.client_name);
   const isSity = handleEmptyField(action.values.destination_city);
   const isContractNumber = handleEmptyField(action.values.contract_number);
   const isContractDate = handleEmptyField(action.values.contract_date);
   const isValidDirectorName = handleEmptyField(action.values.director_name);
   const isDirectorPosition = handleEmptyField(action.values.director_position);
   const isApplicationNumber = handleEmptyField(action.values.last_application_number);

   return{ 
    ...state,
    isValidText: {
     client_name: isClientName,
     destination_city: isSity,
     contract_number: isContractNumber,
     contract_date: isContractDate, 
     director_name: isValidDirectorName,
     director_position: isDirectorPosition,
     last_application_number: isApplicationNumber,
    },
    isFormReadyToSubmit: !isClientName && !isSity && !isContractNumber && !isContractDate && !isValidDirectorName && !isDirectorPosition && !isApplicationNumber
   }
  }
 }
}
