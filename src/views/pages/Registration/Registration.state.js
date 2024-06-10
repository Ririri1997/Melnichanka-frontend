import { handleTel, handleEmptyField, handlePasswordMatch, handlePasswordValid, handleEmailValid } from '../../../utils/formValidations';

// handleEmptyField, 
export const INITIAL_STATE = {
 isValidText: {
  full_name : '',
  phone_number_personal: '',
  phone_number_work: '',
  position: '',
  department: '',
  email: '', 
  password: '', 
  password_confirm: ''
 },
 values: {
  full_name : '',
  phone_number_personal: '',
  phone_number_work: '',
  position: '',
  department: '',
  email: '', 
  password: '', 
  password_confirm: ''
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
   const isValidName = handleEmptyField(action.values.full_name);
   const isValidPersonalTel = handleTel(action.values.phone_number_personal, 'phone_number_personal');
   const isValidWorkTel = handleTel(action.values.phone_number_work, 'phone_number_work');
   const isValidEmail = handleEmailValid(action.values.email);
   const isPasswordValid = handlePasswordValid( action.values.password);
   const isPasswordMatch = handlePasswordMatch(action.values.password, action.values.password_confirm);
   const isDepartment = handleEmptyField(action.values.department);
   const isPosition = handleEmptyField(action.values.position);
   return{ 
    ...state,
    isValidText: {
     full_name : isValidName,
     phone_number_personal: isValidPersonalTel,
     phone_number_work: isValidWorkTel,
     department: isDepartment,
     position: isPosition,
     email: isValidEmail, 
     password: isPasswordValid, 
     password_confirm: isPasswordMatch
    },
    isFormReadyToSubmit: !isValidName && !isValidPersonalTel && !isValidWorkTel && !isValidEmail && !isPasswordMatch && !isPasswordValid
   }
  }
 }
}
