import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    userLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export async function eraseToken(dispatch) {
  try {
    await axios.post("/auth/token-elimination", {}, { withCredentials: true });
  } catch (error) {
    // 차후 에러처리 필요.
    // eslint-disable-next-line no-console
    console.log(error);
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
      dispatch({ type: "login/userLoggedIn" });
    }
  } catch (error) {
    // 차후 에러처리 필요.
    // eslint-disable-next-line no-console
    console.log(error);

    dispatch({ type: "login/userLoggedOut" });
  }
}

export const { userLoggedIn, userLoggedOut } = loginSlice.actions;

export default loginSlice.reducer;
