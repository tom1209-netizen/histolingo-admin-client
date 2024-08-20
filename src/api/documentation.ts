import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/schema";

const domain_api = import.meta.env.VITE_DOMAIN_API;

export const getDocuments = async (
  query: SearchQuery = {}
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/documentations`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
    });
    console.log(response)
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
    const response = await axios.post(`${domain_api}/documentations`, body, {
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
    const response = await axios.patch(
      `${domain_api}/documentations/${id}`,
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
    const response = await axios.get(`${domain_api}/documentations/${id}`, {
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

export const switchDocumentStatus = async (
  id: string,
  status: number
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.patch(
      `${domain_api}/documentations/${id}`,
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
