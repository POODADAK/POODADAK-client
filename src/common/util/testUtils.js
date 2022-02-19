/* eslint-disable react/prop-types */
import { configureStore } from "@reduxjs/toolkit";
import { render as rtlRender } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";

import chatReducer from "../../features/chat/chatSlice";
import loginReducer from "../../features/login/loginSlice";
import mainReducer from "../../features/main/mainSlice";
import toiletReducer from "../../features/toilet/toiletSlice";
import socketMiddleware from "../middlewares/socketMiddleware";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        login: loginReducer,
        chat: chatReducer,
        main: mainReducer,
        toilet: toiletReducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware),
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
