/* eslint-disable camelcase */
import { createSlice } from "@reduxjs/toolkit";

export const toiletSlice = createSlice({
  name: "currnetToiletInfo",
  initialState: {
    allIds: [],
    byIds: {},
  },
  reducers: {
    updateToiletInfo: (state, action) => {
      const { toilet_id, isSOS, userSOSButton } = action.payload;

      if (!state.allIds.lengths) {
        const newState = {
          allIds: [toilet_id],
          byIds: {
            [toilet_id]: {
              isSOSCurrnetToilet: isSOS,
              userClickedSOSButton: userSOSButton,
            },
          },
        };
        return newState;
      }

      if (!state.allIds.includes(toilet_id)) {
        const newState = {
          allIds: [toilet_id],
          byIds: {
            [toilet_id]: {
              isSOSCurrnetToilet: isSOS,
              userClickedSOSButton: userSOSButton,
            },
          },
        };

        return state.push(newState);
      }

      state.byIds[toilet_id].isSOSCurrnetToilet = isSOS;
      state.byIds[toilet_id].userClickedSOSButton = userSOSButton;

      return state;
    },
  },
});

export const { updateToiletInfo } = toiletSlice.actions;

export default toiletSlice.reducer;
