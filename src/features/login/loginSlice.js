import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  userId: null,
  lastVisitedToilet: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
    visitedToiletComponent: (state, action) => {
      state.lastVisitedToilet = action.payload;
    },
  },
});

export async function checkToken(dispatch) {
  const POODADAK_TOKEN = localStorage.getItem("POODADAK_TOKEN");

  try {
    const response = await axios.post("/auth/token-verification", {
      POODADAK_TOKEN,
    });

    if (response.data.result === "verified") {
      dispatch({ type: "login/userLoggedIn", payload: response.data.userId });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      "Default Token verification failed! Please re-login!\n",
      "Original Error:\n",
      error.response.data.errMessage
    );

    dispatch({ type: "login/userLoggedOut" });
  }
}

export const { userLoggedIn, userLoggedOut, visitedToiletComponent } =
  loginSlice.actions;

export default loginSlice.reducer;
