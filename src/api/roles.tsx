import axios, { AxiosResponse } from "axios";
const domain_api = import.meta.env.VITE_DOMAIN_API;
import Cookies from "js-cookie";

interface RoleActions {
  [action: string]: number;
}

export const getRolePermissions = async (): Promise<any[]> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/roles/permissions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const rolePrivileges = response.data.data.rolePrivileges;
    const flattenedPermissions = Object.entries(rolePrivileges).flatMap(([category, actions]) =>
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

interface RoleData {
  name: string;
  permissions: number[];
}

export const createRole = async (
  body: RoleData
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.post(`${domain_api}/roles`, body, {
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

export const getRoles = async (): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/roles`, {
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

export const getIndividualRole = async (id: string): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/roles/${id}`, {
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
}

export const updateRole = async (id: string, body: RoleData): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.put(`${domain_api}/roles/${id}`, body, {
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
}


