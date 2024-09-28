import { createSlice } from "@reduxjs/toolkit";

import { initAuth } from "@/reduxStore/initialState";
import { checkAuthentication, signIn, signOut } from "./action";
import { Auth } from "@/reduxStore/interface";

const initialState: {
  data: Auth;
  isAuthenticated: boolean;
  loading: boolean;
} = { data: initAuth, isAuthenticated: false, loading: false };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: { resetAuth: () => initialState },
  extraReducers: (builder) =>
    builder
      .addCase(signIn.pending, (state) => ({ ...state, loading: true }))
      .addCase(signIn.fulfilled, (_, { payload }) => ({
        data: payload.data,
        isAuthenticated: true,
        loading: false,
      }))
      .addCase(signIn.rejected, (state) => ({ ...state, loading: false }))

      .addCase(checkAuthentication.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(checkAuthentication.fulfilled, (_, { payload }) => ({
        data: payload.data,
        isAuthenticated: true,
        loading: false,
      }))
      .addCase(checkAuthentication.rejected, (state) => ({
        ...state,
        loading: false,
      }))

      .addCase(signOut.pending, (state) => ({ ...state, loading: true }))
      .addCase(signOut.fulfilled, () => initialState)
      .addCase(signOut.rejected, (state) => ({ ...state, loading: false })),
});

export default authSlice.reducer;
export const { resetAuth } = authSlice.actions;
