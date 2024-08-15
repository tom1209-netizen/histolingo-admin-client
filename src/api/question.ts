import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/admin.schema";

const domain_api = import.meta.env.VITE_DOMAIN_API;

export const getQuestions = async (
  query: SearchQuery = {}
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/questions`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Get questions failed");
    } else {
      throw error;
    }
  }
};

export const createQuestion = async (
  body: any
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.post(`${domain_api}/questions`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Create question failed");
    } else {
      throw error;
    }
  }
};

export const updateQuestion = async (
  id: string,
  body: any
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.put(`${domain_api}/questions/${id}`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Update question failed");
    } else {
      throw error;
    }
  }
};

export const getIndividualQuestion = async (
  id: string
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/questions/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Get individual question failed"
      );
    } else {
      throw error;
    }
  }
};

export const switchQuestionStatus = async (id: string, status: string) => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.patch(
      `${domain_api}/questions/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Update question status failed"
      );
    } else {
      throw error;
    }
  }
}
