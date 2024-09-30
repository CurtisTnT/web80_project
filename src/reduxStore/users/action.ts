import { createAsyncThunk } from "@reduxjs/toolkit";

import { SuccessResponse, User, UserQuery } from "@/reduxStore/interface";
import { apiClient, requestApi } from "@/lib/apiClient";
import { handleErrorAsyncThunk } from "@/utils/helpers";

export const getUsers = createAsyncThunk<SuccessResponse<User[]>>(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/users");

      return res.data;
    } catch (error) {
      return handleErrorAsyncThunk({
        error,
        rejectWithValue,
        name: "getUsers",
      });
    }
  }
);

export const createUser = createAsyncThunk<SuccessResponse<User>, UserQuery>(
  "users/createUser",
  async (args, { rejectWithValue }) => {
    try {
      const res = await apiClient.post("/users/new", args);

      return res.data;
    } catch (error) {
      return handleErrorAsyncThunk({
        error,
        rejectWithValue,
        name: "createUser",
      });
    }
  }
);

export const getUserDetail = async (args: { id: string }) =>
  requestApi<User>({
    fetch: async () => {
      const res = await apiClient.get("/users/" + args.id);
      return res.data;
    },
    name: "getUserDetail",
  });

export const updateUser = createAsyncThunk<
  SuccessResponse<User>,
  Pick<User, "id"> & Partial<Omit<User, "id">>
>("users/updateUser", async (args, { rejectWithValue }) => {
  try {
    const {
      id,
      firstName,
      lastName,
      phoneNumber,
      designationLevel,
      jobTitle,
      role,
    } = args;
    const res = await apiClient.post("/users/" + id, {
      firstName,
      lastName,
      phoneNumber,
      designationLevel,
      jobTitle,
      role,
    });

    return res.data;
  } catch (error) {
    return handleErrorAsyncThunk({
      error,
      rejectWithValue,
      name: "updateUser",
    });
  }
});

export const deleteUser = createAsyncThunk<
  SuccessResponse<User>,
  Pick<User, "id">
>("users/deleteUser", async (args, { rejectWithValue }) => {
  try {
    const res = await apiClient.delete("/users/" + args.id);

    return res.data;
  } catch (error) {
    return handleErrorAsyncThunk({
      error,
      rejectWithValue,
      name: "deleteUser",
    });
  }
});
