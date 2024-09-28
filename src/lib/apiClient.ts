import { ErrorResponse, SuccessResponse } from "@/reduxStore/interface";
import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const isDevelopment = import.meta.env.DEV;

export const apiClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function requestApi<T>(options: {
  fetch: () => Promise<SuccessResponse<T>>;
  name: string;
}) {
  const { fetch, name } = options;

  try {
    return await fetch();
  } catch (error: any) {
    const axiosError = error as AxiosError;
    isDevelopment &&
      console.error("Error when calling" + `${name}` + axiosError);
    return axiosError.response!.data as Promise<ErrorResponse>;
  }
}

export const setAuthorizationHeader = (token: string | null) => {
  apiClient.defaults.headers.common["Authorization"] = token;
};
