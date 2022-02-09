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
    await axios.get("/auth/token-elimination");
    dispatch(loginSlice.actions.logout());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
