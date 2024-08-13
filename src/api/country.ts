import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/admin.schema";

const domain_api = import.meta.env.VITE_DOMAIN_API;

interface CountryData {
    name: string;
    description: string;
    image: string;
    localeData: {
      "en-US": { name: string; description: string };
      "ja-JP": { name: string; description: string };
      "vi-VN": { name: string; description: string };
    };
}
export const createCountry = async (body: CountryData): Promise<AxiosResponse<any>> => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(`${domain_api}/countries`, body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Create country failed");
      } else {
        throw error;
      }
    }
}

export const getCountries = async (query : SearchQuery = {}): Promise<AxiosResponse<any>> => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.get(`${domain_api}/countries`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: query,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Get countries failed");
      } else {
        throw error;
      }
    }
}

export const updateCountry = async (id: string, body: CountryData): Promise<AxiosResponse<any>> => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.put(`${domain_api}/countries/${id}`, body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "Update country failed");
      } else {
        throw error;
      }
    }
}

export const getIndividualCountry = async (id: string): Promise<AxiosResponse<any>> => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(`${domain_api}/countries/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Get individual country failed");
        } else {
            throw error;
        }
    }
}