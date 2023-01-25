import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    data: null,
  },
  reducers: {
    LOG_IN: (state, action) => {
      state.data = action.payload;
      state.loggedIn = true;
    },
    LOG_OUT: (state) => {
      state.data = null;
      state.loggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { LOG_IN, LOG_OUT } = authSlice.actions;

export default authSlice.reducer;
