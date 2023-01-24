import { createSlice } from "@reduxjs/toolkit";

export const flightSlice = createSlice({
  name: "flight",
  initialState: {
    count: 1,
    data: null,
    passengers: [],
  },
  reducers: {
    SELECT: (state, action) => {
      state.data = action.payload;
    },
    REMOVE: (state) => {
      state.data = null;
    },
    ADD_PASSENGER: (state, action) => {
      state.passengers = action.payload;
    },
    REMOVE_PASSENGER: (state) => {
      state.passengers = [];
    },
    COUNT: (state, action) => {
      state.count = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SELECT, REMOVE, ADD_PASSENGER, REMOVE_PASSENGER, COUNT } =
  flightSlice.actions;

export default flightSlice.reducer;
