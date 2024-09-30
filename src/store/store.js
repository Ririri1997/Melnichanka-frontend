import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_ACCESS_PERSISTENT_STATE, JWT_REFRESH_PERSISTENT_STATE } from "./auth/authReducer";
import { saveState } from "./storage";

export const store = configureStore({
 reducer: {
  user: userSlice
 }
});

store.subscribe(() => {
 const { access_token, refresh_token } = store.getState().user;
 if (access_token) {
   saveState( JWT_ACCESS_PERSISTENT_STATE, access_token);
 }
 if (refresh_token) {
   saveState( JWT_REFRESH_PERSISTENT_STATE, refresh_token);
 }
});


// import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from "./auth/authReducer";

// import logger from 'redux-logger';
// export const store = configureStore({
//  reducer: {
//  }
// });

// store.subscribe({
//  reducer:{
//   auth: authReducer,
//  },
//  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...(process.env.NODE_ENV !== 'production' ?[logger]:[])),
// });

