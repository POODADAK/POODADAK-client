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

export async function eraseToken(dispatch) {
  try {
    await axios.post("/auth/token-elimination", {}, { withCredentials: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      "failed to get erase token (clearcookie response) response... you might be using other person's identity from now on. If you don't wan't this behavior, please manually delete cookie from your browser setting.\n",
      "Original Error:\n",
      error
    );
  }

  dispatch({ type: "login/userLoggedOut" });
}

export async function checkToken(dispatch) {
  try {
    const response = await axios.post(
      "/auth/token-verification",
      {},
      { withCredentials: true }
    );

    if (response.data.result === "verified") {
      dispatch({ type: "login/userLoggedIn", payload: response.data.userId });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      "Default Token verification failed! Please re-login!\n",
      "Original Error:\n",
      error
    );

    dispatch({ type: "login/userLoggedOut" });
  }
}

export const { userLoggedIn, userLoggedOut, visitedToiletComponent } =
  loginSlice.actions;

export default loginSlice.reducer;
