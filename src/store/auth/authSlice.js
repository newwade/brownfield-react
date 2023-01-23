import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    LOG_IN: (state, action) => {
      state.data = action.payload;
    },
    LOG_OUT: (state) => {
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { LOG_IN, LOG_OUT } = authSlice.actions;

export default authSlice.reducer;
