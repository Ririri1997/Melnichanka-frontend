import axios from "axios";
import { saveTokens, clearTokens, getAccessToken, getRefreshToken } from './authService';
import { PREFIX } from "../helpers/API";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
 (response) => response,
 async (error) => {
   const originalRequest = error.config;

   if (error.response && error.response.status === 401 && !originalRequest._retry) {
     originalRequest._retry = true;

     if (!isRefreshing) {
       isRefreshing = true;
       const refreshToken = getRefreshToken();

       if (refreshToken) {
         try {
           const { data } = await axios.post(
             `${PREFIX}users/token/refresh/`,
             { refresh: refreshToken },
             { withCredentials: true }
           );
           saveTokens(data.access, data.refresh);
           originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
           processQueue(null, data.access);
           return axios(originalRequest);
         } catch (refreshError) {
          console.error('Error refreshing token:', refreshError.response ? refreshError.response.data : refreshError.message);
          processQueue(refreshError, null);
          clearTokens();
          return Promise.reject(refreshError);
          
         } finally {
           isRefreshing = false;
         }
       } else {
         clearTokens();
       }
     } else {
       // Обработка параллельных запросов
       return new Promise((resolve, reject) => {
         failedQueue.push({ resolve, reject });
       })
         .then((token) => {
           originalRequest.headers["Authorization"] = `Bearer ${token}`;
           return axios(originalRequest);
         })
         .catch((err) => Promise.reject(err));
     }
   }

   return Promise.reject(error);
 }
);