// import { AxiosResponse } from "axios";
// import axiosInstance from "./interceptor"; // Import the axios instance with interceptors
// import { SearchQuery } from "../schemas/schema";

// const domain_api = import.meta.env.VITE_DOMAIN_API;

// interface CountryData {
//     name: string;
//     description: string;
//     image: string;
//     localeData: {
//         "en-US": { name: string; description: string };
//         "ja-JP": { name: string; description: string };
//         "vi-VN": { name: string; description: string };
//     };
// }

// export const createCountry = async (body: CountryData): Promise<AxiosResponse<any>> => {
//     try {
//         const response = await axiosInstance.post(`${domain_api}/countries`, body);
//         return response;
//     } catch (error) {
//         if (axiosInstance.isAxiosError(error)) {
//             throw new Error(error.response?.data.message || "Create country failed");
//         } else {
//             throw error;
//         }
//     }
// }

// export const getCountries = async (query: SearchQuery = {}): Promise<AxiosResponse<any>> => {
//     try {
//         const response = await axiosInstance.get(`${domain_api}/countries`, { params: query });
//         return response;
//     } catch (error) {
//         if (axiosInstance.isAxiosError(error)) {
//             throw new Error(error.response?.data.message || "Get countries failed");
//         } else {
//             throw error;
//         }
//     }
// }

// export const updateCountry = async (id: string, body: CountryData): Promise<AxiosResponse<any>> => {
//     try {
//         const response = await axiosInstance.patch(`${domain_api}/countries/${id}`, body);
//         return response;
//     } catch (error) {
//         if (axiosInstance.isAxiosError(error)) {
//             throw new Error(error.response?.data.message || "Update country failed");
//         } else {
//             throw error;
//         }
//     }
// }

// export const getIndividualCountry = async (id: string): Promise<AxiosResponse<any>> => {
//     try {
//         const response = await axiosInstance.get(`${domain_api}/countries/${id}`);
//         return response;
//     } catch (error) {
//         if (axiosInstance.isAxiosError(error)) {
//             throw new Error(error.response?.data.message || "Get individual country failed");
//         } else {
//             throw error;
//         }
//     }
// }

// export const switchCountryStatus = async (id: string, status: number): Promise<AxiosResponse<any>> => {
//     try {
//         const response = await axiosInstance.patch(`${domain_api}/countries/${id}`, { status });
//         return response;
//     } catch (error) {
//         if (axiosInstance.isAxiosError(error)) {
//             throw new Error(error.response?.data.message || "Switch country status failed");
//         } else {
//             throw error;
//         }
//     }
// }
