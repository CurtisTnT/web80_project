import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import usersReducer from "./users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export const dispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
