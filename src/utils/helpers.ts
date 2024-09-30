import { AxiosError } from "axios";
import Cookies from "js-cookie";

import {
  ServerResponse,
  SuccessResponse,
  ErrorResponse,
} from "@/reduxStore/interface";
import { setAuthorizationHeader } from "@/lib/apiClient";

// dd/mm/yyyy
export function formatNormalDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
// dd/M/yyyy
export function formatDateShortMonth(date: string | Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function convertToStartOfDay(date: Date | string) {
  const dateObj = new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj.toString();
}

export function convertToEndOfDay(date: Date | string) {
  const dateObj = new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj.toString();
}

export function formatSingleConstantValue<T extends string>(
  id: T | null,
  objectType: {
    [key in T]: { id: T; name: string };
  }
) {
  return id ? { id, name: objectType[id].name } : null;
}

//Redux store
const isDevelopment = import.meta.env.DEV;

export const handleErrorAsyncThunk = (options: {
  error: unknown;
  name: string;
  rejectWithValue: (value: unknown) => void;
}) => {
  const { error, name, rejectWithValue } = options;

  const axiosError = error as AxiosError;
  isDevelopment &&
    console.error("Error when calling " + `${name} ` + axiosError);

  const res = axiosError.response!.data as ErrorResponse;

  if (res.message === "jwt expired") {
    Cookies.remove("accessToken");
    setAuthorizationHeader(null);
    window.location.href = "/sign-in";
  }
  return rejectWithValue(res as ErrorResponse);
};

//Handle response
export function handleApiResponse<T>({
  res,
  onSuccess,
  onError,
}: {
  res: ServerResponse<T>;
  onSuccess?: (res: SuccessResponse<T>) => void;
  onError?: (res: ErrorResponse) => void;
}) {
  if (res.isSuccess) {
    onSuccess && onSuccess(res);
  } else {
    if (res.message === "jwt expired") {
      Cookies.remove("accessToken");
      setAuthorizationHeader(null);
      window.location.href = "/sign-in";
    }
    onError && onError(res);
  }
}

export function handleSuccessReduxRes<T>({
  payload,
  onSuccess,
}: {
  payload: unknown;
  onSuccess: (res: SuccessResponse<T>) => void;
}) {
  const res = payload as SuccessResponse<T>;

  onSuccess(res);
}

export function handleErrorReduxRes({
  payload,
  onError,
}: {
  payload: unknown;
  onError: (res: ErrorResponse) => void;
}) {
  const res = payload as ErrorResponse;

  onError(res);
}

//Display enum value
export function displayEnumValue<T extends string>(
  id: T | null,
  objectType: {
    [key in T]: { id: T; name: string };
  }
) {
  return id ? objectType[id].name : "N/a";
}
