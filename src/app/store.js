import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "../features/chat/chatSlice";
import loginReducer from "../features/login/loginSlice";
import mainReducer from "../features/main/mainSlice";
import toiletReducer from "../features/toilet/toiletSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    chat: chatReducer,
    main: mainReducer,
    toilet: toiletReducer,
  },
});

export default store;
