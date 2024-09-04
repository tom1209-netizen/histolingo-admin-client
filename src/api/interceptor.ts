import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_API,
});

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 403) {
      // Redirect to login page if unauthorized
      window.location.href = '/login'; // Adjust the path as needed
    }
    return Promise.reject(error);
  }
);

export default api;
