import axios, { AxiosResponse } from "axios";
const domain_api = import.meta.env.VITE_DOMAIN_API;
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/schema";
import { RoleActions } from "../interfaces/role.interface";
import { RoleData } from "../interfaces/role.interface";
import api from "./interceptor";

export const getRolePermissions = async (): Promise<any[]> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/roles/permissions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const rolePrivileges = response.data.data.rolePrivileges;
    const flattenedPermissions = Object.entries(rolePrivileges).flatMap(
      ([category, actions]) =>
        Object.entries(actions as RoleActions).map(([action, code]) => ({
          [`${category}-${action}`]: code,
        }))
    );
    return flattenedPermissions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Get roles failed");
    } else {
      throw error;
    }
  }
};

export const createRole = async (
  body: RoleData
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.post(`/roles`, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Create role failed");
    } else {
      throw error;
    }
  }
};

export const getRoles = async (
  query: SearchQuery = {}
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/roles`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
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


export const getIndividualRole = async (
  id: string
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.get(`/roles/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Get role failed");
    } else {
      throw error;
    }
  }
};

export const updateRole = async (
  id: string,
  body: RoleData
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.patch(`/roles/${id}`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Update role failed");
    } else {
      throw error;
    }
  }
};

export const switchRoleStatus = async (
  id: string,
  status: number
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await api.patch(
      `/roles/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Switch role status failed"
      );
    } else {
      throw error;
    }
  }
};
