// import {Dispatch} from "@reduxjs/toolkit";
// import { loginStart, loginSuccess, loginFailure } from "./authReducer";
// import { PREFIX } from "../../helpers/API";


// const api =  `${PREFIX}users/login/`;

// export const loginUser = 
//  (data) => async (dispatch) => {
//   try{
//    dispatch(loginStart());
//    const res = await api.auth.login(data);
//    dispatch(loginSuccess(res.data.accessToken))
//   } catch(e){
//    console.error(e);
//    dispatch(loginFailure(e.message))
//   }
//  }
