import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/admin.schema";

const domain_api = import.meta.env.VITE_DOMAIN_API;

interface TopicData {
  name: string;
  description: string;
  image: string;
  countryId: string;
  localeData: {
    "en-US": { name: string; description: string };
    "ja-JP": { name: string; description: string };
    "vi-VN": { name: string; description: string };
  };
}

export const createTopic = async (
  body: TopicData
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.post(`${domain_api}/topics`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Create topic failed");
    } else {
      throw error;
    }
  }
};

export const getTopics = async (
  query: SearchQuery = {}
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/topics`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Get topics failed");
    } else {
      throw error;
    }
  }
};

export const updateTopic = async (
  id: string,
  body: TopicData
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.put(`${domain_api}/topics/${id}`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Update topic failed");
    } else {
      throw error;
    }
  }
};

export const getIndividualTopic = async (
  id: string
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/topics/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Get individual topic failed"
      );
    } else {
      throw error;
    }
  }
};

export const getTopicsByCountry = async (
  countryId: string
): Promise<string[]> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/topics`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const allTopics = response.data.data.topics;
    const filteredTopics = allTopics.filter(
      (topic: any) => topic.countryId === countryId
    );

    return filteredTopics;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Get topics by country failed"
      );
    } else {
      throw error;
    }
  }
};
