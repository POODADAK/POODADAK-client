import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "../features/chat/chatSlice";
import loginReducer from "../features/login/loginSlice";
import currnetToiletInfoReducer from "../features/toilet/toiletSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    currnetToiletInfo: currnetToiletInfoReducer,
    chat: chatReducer,
  },
});

export default store;
