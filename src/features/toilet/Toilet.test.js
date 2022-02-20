import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "../../common/util/testUtils";
import { initialState as chatInitialState } from "../chat/chatSlice";
import { initialState as loginInitialState } from "../login/loginSlice";
import { initialState as mainInitialState } from "../main/mainSlice";
import Toilet from "./Toilet";
import { initialState as toiletInitialState } from "./toiletSlice";

jest.mock("../chat/chatSlice", () => {
  const originalModule = jest.requireActual("../chat/chatSlice");

  return {
    __esModule: true,
    ...originalModule,
    createdChatroom: () => (dispatch) => {
      dispatch({
        type: "chat/userEnteredChatroom",
        payload: { toilet: "test" },
      });
    },
  };
});

jest.mock("../../common/api/getLiveChatByToilet", () => ({
  __esModule: true,
  default: () => ({ liveChatroomList: [], myChatroom: null }),
}));

jest.mock("../../common/api/getToiletById", () => {
  const mockLoadingToiletData = {
    _id: "test",
    toiletType: "로딩중...",
    toiletName: "testToiletName",
    roadNameAddress: "로딩중...",
    indexNameAddress: "로딩중...",
    isUnisexToilet: true,
    menToiletBowlNumber: "로딩중...",
    menUrinalNumber: "로딩중...",
    menHandicapToiletBowlNumber: "로딩중...",
    menHandicapUrinalNumber: "로딩중...",
    menChildrenToiletBowlNumber: "로딩중...",
    menChildrenUrinalNumber: "로딩중...",
    ladiesToiletBowlNumber: "로딩중...",
    ladiesHandicapToiletBowlNumber: "로딩중...",
    ladiesChildrenToiletBowlNumber: "로딩중...",
    institutionName: "로딩중...",
    phoneNumber: "로딩중...",
    openTime: "로딩중...",
    installationYear: 2000,
    referenceDate: new Date().toISOString(),
    institutionCode: 1,
    latestToiletPaperInfo: {
      lastDate: new Date().toISOString(),
      hasToiletPaper: true,
    },
    location: {
      type: "로딩중...",
      coordinates: [0, 0],
    },
    reviewList: [],
    chatRoomList: [],
    isSOS: "로딩중...",
  };

  mockLoadingToiletData.reviewList = [
    {
      _id: "test",
      writer: { _id: "testId", username: "testUsername", level: "GOLD" },
      updatedAt: "invalidDate",
      image: "none",
      description: "testDescription",
      rating: 3,
      isMyReview: false,
      reviewId: "testReviewId",
      toilet: {},
      key: "testKey",
    },
  ];

  return {
    __esModule: true,
    default: () => Promise.resolve(mockLoadingToiletData),
  };
});

describe("Chatroom", () => {
  let initialReduxState = {
    login: JSON.parse(JSON.stringify(loginInitialState)),
    chat: JSON.parse(JSON.stringify(chatInitialState)),
    main: JSON.parse(JSON.stringify(mainInitialState)),
    toilet: JSON.parse(JSON.stringify(toiletInitialState)),
  };

  const wrappedToiletComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/toilets/:toiletId" element={<Toilet />} />
      </Routes>
    </BrowserRouter>
  );

  const root = document.createElement("div");
  root.id = "root";

  beforeEach(() => {
    initialReduxState.login.userId = "tester";
    window.history.pushState({}, "", "/toilets/test");
    document.body.appendChild(root);
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

  test("should render mocked tolet info.", async () => {
    await waitFor(() =>
      render(wrappedToiletComponent, {
        preloadedState: initialReduxState,
      })
    );

    expect(screen.getByText("testUsername")).toBeInTheDocument();
    expect(screen.getByText("testToiletName")).toBeInTheDocument();
    expect(screen.getByText("testDescription")).toBeInTheDocument();
  });

  test("should render WaitingSavior button when loggedin user clicked SOS button.", async () => {
    initialReduxState.login.isLoggedIn = true;
    initialReduxState.chat.nameSpace = "test";
    initialReduxState.toilet.nearToilets = [{ _id: "test" }];

    await waitFor(() =>
      render(wrappedToiletComponent, {
        preloadedState: initialReduxState,
      })
    );

    await waitFor(() => fireEvent.click(screen.getAllByRole("button")[1]));
    expect(screen.getByText("도와줄 사람 기다리기")).toBeInTheDocument();
  });

  test("should render 'too far' pop-up when user is not around the toilet", async () => {
    initialReduxState.login.isLoggedIn = true;
    initialReduxState.toilet.nearToilets = [];

    await waitFor(() =>
      render(wrappedToiletComponent, {
        preloadedState: initialReduxState,
      })
    );

    await waitFor(() => fireEvent.click(screen.getAllByRole("button")[1]));

    expect(
      screen.getByText(
        "정말 도움을 받고 싶으신가요? 아니어도 어쩔 수 없죠... 채팅은 해봐야 하니까요."
      )
    ).toBeInTheDocument();
  });
});
