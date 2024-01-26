import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import pinReducer from "../redux/pins/pinSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pins: pinReducer,
  },
}); 