import axios, { AxiosResponse } from "axios";
const domain_api = import.meta.env.VITE_DOMAIN_API;
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/schema";

interface AdminData {
  adminName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string[];
  status: number;
}

export const getAdmins = async (
  query: SearchQuery = {}
): Promise<AxiosResponse<any>> => {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(`${domain_api}/admins`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: query,
    });
    console.log(response);
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
    const response = await axios.post(`${domain_api}/admins`, body, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Create admin failed");
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
    const response = await axios.patch(`${domain_api}/admins/${id}`, body, {
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
    const response = await axios.get(`${domain_api}/admins/${id}`, {
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
    const response = await axios.patch(
      `${domain_api}/admins/${id}`,
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
    const response = await axios.get(`${domain_api}/admins/getRoles`, {
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
