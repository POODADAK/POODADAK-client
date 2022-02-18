import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen, cleanup, waitFor } from "../../common/util/testUtils";
import { initialState as loginInitialState } from "../login/loginSlice";
import { initialState as mainInitialState } from "../main/mainSlice";
import { initialState as toiletInitialState } from "../toilet/toiletSlice";
import ChatroomList from "./ChatroomList";
import { initialState as chatInitialState } from "./chatSlice";

const mockTestMessage1 = "test text message 1";
const mockTestMessage2 = "test text message 2";
const mockTestMessage3 = "test text message 3";

jest.mock("../../common/api/getLiveChatByToilet", () => ({
  __esModule: true,
  default: () =>
    Promise.resolve({
      liveChatroomList: [
        {
          _id: 1,
          owner: { username: "test1" },
          chatList: [{ message: "test text message 1" }],
        },
        {
          _id: 2,
          owner: { username: "test2" },
          chatList: [{ message: "test text message 2" }],
        },
        {
          _id: 3,
          owner: { username: "test3" },
          chatList: [{ message: "test text message 3" }],
        },
      ],
    }),
}));

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    __esModule: true,
    ...originalModule,
    useLocation: () => ({
      state: { toiletId: 1, toiletName: "testToilet" },
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

  const wrappedChatRoomListComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/chatroomList" element={<ChatroomList />} />
      </Routes>
    </BrowserRouter>
  );

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  });

  beforeEach(() => {
    initialReduxState.login.userId = "tester";
    window.history.pushState({}, "", "/chatroomList");
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

  test("should render mocked chat list.", async () => {
    await waitFor(() =>
      render(wrappedChatRoomListComponent, {
        preloadedState: initialReduxState,
      })
    );

    expect(screen.getByText(mockTestMessage1)).toBeInTheDocument();
    expect(screen.getByText(mockTestMessage2)).toBeInTheDocument();
    expect(screen.getByText(mockTestMessage3)).toBeInTheDocument();
  });
});
