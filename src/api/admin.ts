import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/schema";
import api from "./interceptor";

interface AdminData {
  adminName: string;
  email: string;
  password: string;
  status: number;
  firstName: string;
  lastName: string;
  roles: string[];
}

export const getAdmins = async (
  query: SearchQuery = {}
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get('/admins', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Get admins failed");
    } else {
      throw error;
    }
  }
};

export const createAdmin = async (body: any): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.post(`/admins`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw { status: error.response?.status, message: error.response?.data.message || "Create admin failed" };
    } else {
      throw error;
    }
  }
};

export const updateAdmin = async (
  id: string,
  body: AdminData
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.patch(`/admins/${id}`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Update admin failed");
    } else {
      throw error;
    }
  }
};

export const getIndividualAdmin = async (
  id: string
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/admins/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Get individual admin failed"
      );
    } else {
      throw error;
    }
  }
};

export const switchAdminStatus = async (
  id: string,
  status: string
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.patch(
      `/admins/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Update admin status failed"
      );
    } else {
      throw error;
    }
  }
};

export const getRolesBypassAuthorization = async (): Promise<
  AxiosResponse<any>
> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/admins/getRoles`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Get roles failed");
    } else {
      throw error;
    }
  }
};

export const getProfile = async (): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/admins/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Get profile failed");
    } else {
      throw error;
    }
  }
}