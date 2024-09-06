import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_API,
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
