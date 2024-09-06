import axios from "axios";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { SearchQuery } from "../schemas/schema";
import api from "./interceptor";

// const domain_api = import.meta.env.VITE_DOMAIN_API;

export const getIndividualTest = async (id: string) : Promise<AxiosResponse<any>> => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await api.get(`/tests/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Get test failed");
        } else {
            throw error;
        }
    }
};

export const getTests = async (query: SearchQuery = {}): Promise<AxiosResponse<any>> => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await api.get(`/tests`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: query,
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Get tests failed");
        } else {
            throw error;
        }
    }
}

export const createTest = async (body: any): Promise<AxiosResponse<any>> => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await api.post(`/tests`, body, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Create test failed");
        } else {
            throw error;
        }
    }
}

export const updateTest = async (id: string, body: any): Promise<AxiosResponse<any>> => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await api.put(`/tests/${id}`, body, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Update test failed");
        } else {
            throw error;
        }
    }
}

export const startTest = async (body: any): Promise<AxiosResponse<any>> => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await api.post(`/tests/startDemo`, body, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Start test failed");
        } else {
            throw error;
        }
    }
}

export const checkAnswer = async (body: any): Promise<AxiosResponse<any>> => {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await api.post(`/tests/checkAnswer`, body, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message || "Check answer failed");
        } else {
            throw error;
        }
    }
}