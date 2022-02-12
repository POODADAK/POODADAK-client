import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nearToilets: [],
};

export const toiletSlice = createSlice({
  name: "toilet",
  initialState,
  reducers: {
    updateNearToilets: (state, action) => {
      state.nearToilets = action.payload;
    },
  },
});

export const { updateNearToilets } = toiletSlice.actions;

export default toiletSlice.reducer;
