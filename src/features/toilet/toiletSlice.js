import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nearToilets: [],
};

export const toiletSlice = createSlice({
  name: "toilet",
  initialState,
  reducers: {
    nearToiletsUpdated: (state, action) => {
      state.nearToilets = action.payload;
    },
  },
});

export const { nearToiletsUpdated } = toiletSlice.actions;

export default toiletSlice.reducer;
