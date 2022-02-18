import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  nearToilets: [],
  selectedToilet: null,
};

export const toiletSlice = createSlice({
  name: "toilet",
  initialState,
  reducers: {
    nearToiletsUpdated: (state, action) => {
      state.nearToilets = action.payload;
    },
    selectedToiletUpdated: (state, action) => {
      state.selectedToilet = action.payload;
    },
  },
});

export const { nearToiletsUpdated, selectedToiletUpdated } =
  toiletSlice.actions;

export default toiletSlice.reducer;
