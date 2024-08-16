import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const domain_api = import.meta.env.VITE_DOMAIN_API;

export const uploadFile = async (file: File): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(`${domain_api}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response)
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Upload file failed");
    } else {
      throw error;
    }
  }
};
