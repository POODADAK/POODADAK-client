import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen } from "../../common/util/testUtils";
import { initialState as loginInitialState } from "../login/loginSlice";
import { initialState as mainInitialState } from "../main/mainSlice";
import { initialState as toiletInitialState } from "../toilet/toiletSlice";
import Chatroom from "./Chatroom";
import {
  initialState as chatInitialState,
  participantStatusOptions,
} from "./chatSlice";

describe("Chatroom", () => {
  const wrappedChatRoomComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/chatroomList/:chatroomId" element={<Chatroom />} />
      </Routes>
    </BrowserRouter>
  );

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  });

  beforeEach(() => {
    window.history.pushState({}, "", "/chatroomList/mockChatroomId");
  });

  test("should render 'no connected chat' statement when there's no socket connection.", () => {
    render(wrappedChatRoomComponent);

    expect(
      screen.getByText("현재 연결된 채팅이 없습니다.")
    ).toBeInTheDocument();

    // screen.debug();
  });

  test("should render 'stranger has disconnected' when stranger disconnect", () => {
    const chatInitialStateCopy = JSON.parse(JSON.stringify(chatInitialState));

    chatInitialStateCopy.participantStatus =
      participantStatusOptions.participantLeft;

    render(wrappedChatRoomComponent, {
      preloadedState: {
        login: loginInitialState,
        chat: chatInitialStateCopy,
        main: mainInitialState,
        toilet: toiletInitialState,
      },
    });

    expect(
      screen.getByText("상대방이 채팅을 종료 했습니다.")
    ).toBeInTheDocument();

    screen.debug();
  });

  test("should render loaded chat list when first rendered", () => {
    screen.debug();
  });
});
