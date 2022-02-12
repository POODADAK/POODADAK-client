import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gotUserLocation: false,
  userLocation: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateUserLocation: (state, action) => {
      state.gotUserLocation = true;
      state.userLocation = action.payload;
    },
    removeUserLocation: (state) => {
      state.gotUserLocation = false;
      state.userLocation = [];
    },
  },
});

export const { updateUserLocation, removeUserLocation } = mainSlice.actions;

export default mainSlice.reducer;
