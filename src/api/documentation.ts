import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/schema";
import api from "./interceptor";

// const domain_api = import.meta.env.VITE_DOMAIN_API;

export const getDocuments = async (
  query: SearchQuery = {}
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/documentations`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Get documents failed");
    } else {
      throw error;
    }
  }
};

export const createDocument = async (
  body: any
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.post(`/documentations`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Create document failed");
    } else {
      throw error;
    }
  }
};

export const updateDocument = async (
  id: string,
  body: any
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.patch(
      `/documentations/${id}`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Update document failed");
    } else {
      throw error;
    }
  }
};

export const getIndividualDocument = async (
  id: string
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/documentations/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Get individual document failed"
      );
    } else {
      throw error;
    }
  }
};

export const getDocumentationsByCountryAndTopic = async (
  countryId: string,
): Promise<string[]> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/tests/getDocumentations`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { countryId },
    });
    return response.data.data;   
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Get documentations by country and topic failed"
      );
    } else {
      throw error;
    }
  }
};

export const switchDocumentStatus = async (
  id: string,
  status: number
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.patch(
      `/documentations/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Switch document status failed"
      );
    } else {
      throw error;
    }
  }
};
