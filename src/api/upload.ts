import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import api from "./interceptor";

// const domain_api = import.meta.env.VITE_DOMAIN_API;

export const uploadFile = async (file: File): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post(`/upload`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Upload file failed");
    } else {
      throw error;
    }
  }
};
