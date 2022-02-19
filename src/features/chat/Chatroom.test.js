import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  render,
  screen,
  cleanup,
  fireEvent,
} from "../../common/util/testUtils";
import { initialState as loginInitialState } from "../login/loginSlice";
import { initialState as mainInitialState } from "../main/mainSlice";
import { initialState as toiletInitialState } from "../toilet/toiletSlice";
import Chatroom from "./Chatroom";
import {
  initialState as chatInitialState,
  participantStatusOptions,
} from "./chatSlice";

jest.mock("../../common/middlewares/socketMiddleware", () => {
  const originalModule = jest.requireActual(
    "../../common/middlewares/socketMiddleware"
  );

  return {
    __esModule: true,
    ...originalModule,
    socketEmitted: () => ({
      type: "test",
    }),
  };
});

describe("Chatroom", () => {
  let initialReduxState = {
    login: JSON.parse(JSON.stringify(loginInitialState)),
    chat: JSON.parse(JSON.stringify(chatInitialState)),
    main: JSON.parse(JSON.stringify(mainInitialState)),
    toilet: JSON.parse(JSON.stringify(toiletInitialState)),
  };

  const wrappedChatRoomComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/chatroomList/:chatroomId" element={<Chatroom />} />
        <Route path="/toilets/:toiletId" element={<div />} />
      </Routes>
    </BrowserRouter>
  );

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  });

  beforeEach(() => {
    initialReduxState.login.userId = "tester";
    window.history.pushState({}, "", "/chatroomList/mockChatroomId");
  });

  afterEach(() => {
    initialReduxState = {
      login: JSON.parse(JSON.stringify(loginInitialState)),
      chat: JSON.parse(JSON.stringify(chatInitialState)),
      main: JSON.parse(JSON.stringify(mainInitialState)),
      toilet: JSON.parse(JSON.stringify(toiletInitialState)),
    };

    cleanup();
  });

  test("should render 'no connected chat' statement when there's no socket connection.", () => {
    render(wrappedChatRoomComponent, {
      preloadedState: initialReduxState,
    });

    expect(
      screen.getByText("현재 연결된 채팅이 없습니다.")
    ).toBeInTheDocument();
  });

  test("should render 'stranger has disconnected' when stranger disconnect", () => {
    initialReduxState.chat.participantStatus =
      participantStatusOptions.participantLeft;

    render(wrappedChatRoomComponent, {
      preloadedState: initialReduxState,
    });

    expect(
      screen.getByText("상대방이 채팅을 종료 했습니다.")
    ).toBeInTheDocument();
  });

  test("should render loaded chat list when first rendered", () => {
    const testMessage = "It should render!";

    initialReduxState.chat.chatList = [
      {
        sender: "tester",
        message: testMessage,
        date: new Date().toISOString(),
      },
    ];

    render(wrappedChatRoomComponent, {
      preloadedState: initialReduxState,
    });

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  test("when click go back it should get out of screen", () => {
    jest.fn();

    render(wrappedChatRoomComponent, {
      preloadedState: initialReduxState,
    });

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(() => screen.getByText("보내기")).toThrow();
  });

  test("when chat is submitted it should appear on screen", () => {
    const testText = "테스트 문구입니다!";

    render(wrappedChatRoomComponent, {
      preloadedState: initialReduxState,
    });

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: testText },
    });

    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});
