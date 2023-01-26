import { createSlice } from "@reduxjs/toolkit";

export const flightSlice = createSlice({
  name: "flight",
  initialState: {
    count: 1,
    data: null,
    passengers: [],
  },
  reducers: {
    SELECT_FLIGHT: (state, action) => {
      state.data = action.payload;
    },
    REMOVE_FLIGHT: (state) => {
      state.data = null;
    },
    ADD_PASSENGER: (state, action) => {
      state.passengers = action.payload;
    },
    REMOVE_PASSENGER: (state) => {
      state.passengers = [];
    },
    SET_COUNT: (state, action) => {
      state.count = action.payload;
    },
    RESET_COUNT: (state) => {
      state.count = 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SELECT_FLIGHT,
  REMOVE_FLIGHT,
  ADD_PASSENGER,
  REMOVE_PASSENGER,
  SET_COUNT,
  RESET_COUNT,
} = flightSlice.actions;

export default flightSlice.reducer;
