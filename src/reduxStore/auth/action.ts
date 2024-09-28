import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { apiClient, requestApi, setAuthorizationHeader } from "@/lib/apiClient";
import {
  Auth,
  ForgotPasswordQuery,
  SuccessResponse,
  SignInQuery,
  SignUpQuery,
  VerifyOtpQuery,
  ResetPasswordQuery,
} from "@/reduxStore/interface";
import { handleErrorAsyncThunk } from "@/utils/helpers";

export const signUp = async (args: SignUpQuery) =>
  requestApi<Auth>({
    fetch: async () => {
      const res = await apiClient.post("/sign-up", {
        ...args,
        role: "staff",
      });

      return res.data;
    },
    name: "signUp",
  });

export const signIn = createAsyncThunk<SuccessResponse<Auth>, SignInQuery>(
  "auth/signIn",
  async (args, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/sign-in", args);

      const accessToken = res.headers["authorization"];
      setAuthorizationHeader(accessToken);
      Cookies.set("accessToken", accessToken, { expires: 0.125 }); //3 days

      return res.data;
    } catch (error) {
      return handleErrorAsyncThunk({ error, name: "signIn", rejectWithValue });
    }
  }
);

export const checkAuthentication = createAsyncThunk<SuccessResponse<Auth>>(
  "auth/checkAuthentication",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        return rejectWithValue(null);
      }

      setAuthorizationHeader(accessToken);
      const res = await apiClient.post("/check-auth");

      return res.data;
    } catch (error) {
      return handleErrorAsyncThunk({
        error,
        name: "checkAuthentication",
        rejectWithValue,
      });
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/sign-out");

      Cookies.remove("accessToken");
      setAuthorizationHeader(null);

      return res.data;
    } catch (error) {
      return handleErrorAsyncThunk({ error, name: "signOut", rejectWithValue });
    }
  }
);

export const forgotPassword = async (args: ForgotPasswordQuery) =>
  requestApi<null>({
    fetch: async () => {
      const res = await apiClient.post("/forgot-password", args);

      return res.data;
    },
    name: "forgotPassword",
  });

export const verifyOtp = async (args: VerifyOtpQuery) =>
  requestApi<null>({
    fetch: async () => {
      const res = await apiClient.post("/verify-otp", args);

      return res.data;
    },
    name: "verifyOtp",
  });

export const resetPassword = async (args: ResetPasswordQuery) =>
  requestApi<null>({
    fetch: async () => {
      const res = await apiClient.post("/reset-password", args);

      return res.data;
    },
    name: "resetPassword",
  });
