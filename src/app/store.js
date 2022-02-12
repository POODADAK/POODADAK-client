import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "../features/login/loginSlice";
import currnetToiletInfoReducer from "../features/toilet/toiletSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    currnetToiletInfo: currnetToiletInfoReducer,
  },
});

export default store;
