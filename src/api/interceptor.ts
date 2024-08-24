import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://your-api-domain.com/api', // Replace with your API's base URL
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh logic
axiosInstance.interceptors.response.use(
    (response) => {
        // Return response if everything is OK
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an expired access token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // prevent infinite loops

            // Try refreshing the token
            try {
                const refreshToken = Cookies.get('refreshToken');

                // If refresh token is available, try refreshing the access token
                if (refreshToken) {
                    const response = await axios.post(
                        'https://your-api-domain.com/api/auth/refresh-token', // Replace with your refresh token endpoint
                        {},
                        { headers: { 'x-refresh-token': refreshToken } }
                    );

                    // Save the new access token to cookies
                    const { accessToken } = response.data;
                    Cookies.set('accessToken', accessToken);

                    // Update original request's Authorization header with new access token
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                    // Retry the original request with the new access token
                    return axiosInstance(originalRequest);
                } else {
                    // If no refresh token is available, reject the promise and redirect to login
                    return Promise.reject(error);
                }
            } catch (tokenRefreshError) {
                // Handle cases where the refresh token is expired or invalid
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(tokenRefreshError);
            }
        }

        // If error is not due to token expiration, reject the promise
        return Promise.reject(error);
    }
);

export default axiosInstance;
