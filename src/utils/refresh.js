import axios from "axios";

let refresh = false;
const accessToken = localStorage.getItem('access_token');

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const refreshToken = localStorage.getItem('refresh_token');
      console.log(refreshToken)
      if (refreshToken) {
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/api/v1/users/token/refresh/',
            { refresh: refreshToken }, // попробовать сделать json 
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              withCredentials: true
            }
          );
          if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            refresh = false;
            return axios(error.config);
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
        }
      } else {
        console.error('Refresh token not found');
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);

