import { configureStore } from "@reduxjs/toolkit";
import { localStorageMiddleware } from "../middleware/localStorage";
import authSlice from "./auth/authSlice";
import flightSlice from "./flight/flightSlice";

const reHydrateStore = () => {
  if (localStorage.getItem("root") !== null) {
    return JSON.parse(localStorage.getItem("root"));
  }
};

export default configureStore({
  reducer: {
    user: authSlice,
    flight: flightSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: reHydrateStore(),
});
