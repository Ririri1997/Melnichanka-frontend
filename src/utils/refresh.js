import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/api/v1/users/token/refresh/',
            { refresh: refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
              },
              withCredentials: true
            }
          );

          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
            originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
            processQueue(null, response.data.access);
            return axios(originalRequest);
          }
        } catch (refreshError) {
          console.error('Ошибка при обновлении токена:', refreshError);
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        console.error('Токен обновления не найден');
      }
    }

    return Promise.reject(error);
  }
);