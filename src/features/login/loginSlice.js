import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
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

  dispatch({ type: "login/logout" });
}

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
