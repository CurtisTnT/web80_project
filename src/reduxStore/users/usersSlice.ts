import { createSlice } from "@reduxjs/toolkit";

import { User } from "@/reduxStore/interface";
import { createUser, deleteUser, getUsers, updateUser } from "./action";

const initialState: { data: User[]; loading: boolean } = {
  data: [],
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getUsers.fulfilled, (_, { payload }) => ({
        data: payload.data,
        loading: false,
      }))
      .addCase(getUsers.rejected, (state) => ({
        ...state,
        loading: false,
      }))

      .addCase(createUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(createUser.fulfilled, (state, { payload }) => ({
        data: [payload.data, ...state.data],
        loading: false,
      }))
      .addCase(createUser.rejected, (state) => ({
        ...state,
        loading: false,
      }))

      .addCase(updateUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(updateUser.fulfilled, (state, { payload }) => ({
        data: state.data.map((user) =>
          payload.data.id === user.id ? payload.data : user
        ),
        loading: false,
      }))
      .addCase(updateUser.rejected, (state) => ({
        ...state,
        loading: false,
      }))

      .addCase(deleteUser.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteUser.fulfilled, (state, { payload }) => ({
        data: state.data.filter(({ id }) => payload.data.id !== id),
        loading: false,
      }))
      .addCase(deleteUser.rejected, (state) => ({
        ...state,
        loading: false,
      })),
});

export default usersSlice.reducer;
