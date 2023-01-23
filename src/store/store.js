import { configureStore } from "@reduxjs/toolkit";
import { localStorageMiddleware } from "../middleware/localStorage";
import authSlice from "./auth/authSlice";

const reHydrateStore = () => {
  if (localStorage.getItem("root") !== null) {
    return JSON.parse(localStorage.getItem("root"));
  }
};

export default configureStore({
  reducer: {
    user: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: reHydrateStore(),
});
