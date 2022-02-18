import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  gotUserLocation: false,
  userLocation: [],
  isMainStarted: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    userLocationUpdated: (state, action) => {
      state.gotUserLocation = true;
      state.userLocation = action.payload;
    },
    userLocationRemoved: (state) => {
      state.gotUserLocation = false;
      state.userLocation = [];
    },
    mainStartUpdated: (state) => {
      state.isMainStarted = true;
    },
  },
});

export const { userLocationUpdated, userLocationRemoved, mainStartUpdated } =
  mainSlice.actions;

export default mainSlice.reducer;
