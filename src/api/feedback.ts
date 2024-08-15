import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/admin.schema";

const domain_api = import.meta.env.VITE_DOMAIN_API;

export const getFeedbacks = async (query : SearchQuery = {}): Promise<AxiosResponse<any>> => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(`${domain_api}/feedbacks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: query,
      });
      console.log(response)
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Get feedbacks failed");
      } else {
        throw error;
      }
    }
  }


  export const getIndividualFeedback = async (id: string): Promise<AxiosResponse<any>> => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(`${domain_api}/feedbacks/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Get feedback failed");
      } else {
        throw error;
      }
    }
  }

  export const switchFeedbackStatus = async (id: string, status: string): Promise<AxiosResponse<any>> => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.patch(`${domain_api}/feedbacks/${id}`, { status }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Update feedback status failed");
      } else {
        throw error;
      }
    }
  }
    