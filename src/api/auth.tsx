import axios, { AxiosResponse } from 'axios';
const domain_api = import.meta.env.VITE_DOMAIN_API

export const login = async (email: string, password: string): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${domain_api}/admin/login`, {
      email,
      password,
    });

    console.log(response, 'in api');
    console.log(response.data, 'in api');

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed');
    } else {
      throw error;
    }
  }
};


export const forgetPassword = async (email: string): Promise<AxiosResponse<any>> => {
  try {
    const response = await axios.post(`${domain_api}/password/forgot-password`, {
      email,
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Send request to reset password failed');
    } else {
      throw error;
    }
  }
};

export const resetPassword = async (newPassword: string, confirmPassword: string, token: string, userId: string): Promise<AxiosResponse<any>> => {
  try {
    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const response = await axios.post(`${domain_api}/password/reset-password`, {
      newPassword, token, userId
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Reset password failed');
    } else {
      throw error;
    }
  }
};