import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/schema";
import api from "./interceptor";

// const domain_api = import.meta.env.VITE_DOMAIN_API;

export const getLearners = async (query : SearchQuery = {}): Promise<AxiosResponse<any>> => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await api.get(`/players`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: query,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Get learners failed");
      } else {
        throw error;
      }
    }
  }

  export const getIndividualLearner = async (id: string): Promise<AxiosResponse<any>> => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await api.get(`/learners/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Get learner failed");
      } else {
        throw error;
      }
    }
  }

  export const switchLearnerStatus = async (id: string, status: string): Promise<AxiosResponse<any>> => {  
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await api.patch(`/players/${id}`, { status }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Update learner status failed");
      } else {
        throw error;
      }
    }

  }