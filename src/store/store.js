import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_ACCESS_PERSISTENT_STATE, JWT_REFRESH_PERSISTENT_STATE } from "./slice/authReducer.slice.js"; // Срез авторизации
import homeSlice from "./slice/home.slice.js"; // Наш срез для главной страницы
import deliverySlice from "./slice/delivery.slice.js"; // Наш срез для главной страницы
import clientsSlice from "./slice/clients.slice.js"; // Наш срез для главной страницы
import { saveState } from "./storage";

export const store = configureStore({
  reducer: {
    user: userSlice,
    home: homeSlice,
    delivery: deliverySlice, 
    clients: clientsSlice, 
  },
});

store.subscribe(() => {
  const { access_token, refresh_token } = store.getState().user;
  if (access_token) {
    saveState(JWT_ACCESS_PERSISTENT_STATE, access_token);
  }
  if (refresh_token) {
    saveState(JWT_REFRESH_PERSISTENT_STATE, refresh_token);
  }
});
