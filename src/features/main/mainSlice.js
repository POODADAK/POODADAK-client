import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gotUserLocation: false,
  userLocation: [],
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
  },
});

export const { userLocationUpdated, userLocationRemoved } = mainSlice.actions;

export default mainSlice.reducer;
