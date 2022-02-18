import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen, cleanup, waitFor } from "../../common/util/testUtils";
import { initialState as chatInitialState } from "../chat/chatSlice";
import { initialState as loginInitialState } from "../login/loginSlice";
import { initialState as mainInitialState } from "../main/mainSlice";
import { initialState as toiletInitialState } from "../toilet/toiletSlice";
import Profile from "./Profile";

jest.mock("../../common/api/getUserReviewList", () => ({
  __esModule: true,
  default: () =>
    Promise.resolve({
      _id: "testId",
      username: "testerUsername",
      level: "BRONZE",
      email: "poodadak@gmail.com",
      socialService: "NAVER",
      reviewList: [
        {
          _id: "testReviewId",
          writer: "testId",
          toilet: "testToiletId",
          rating: 5,
          description: "깨끗해요!",
          image:
            "https://poodadak-image.s3.ap-northeast-2.amazonaws.com/9d5390aa0b9e1ed39cf1989422cca5e6",
          updatedAt: "2022-02-18T16:08:40.062Z",
        },
      ],
    }),
}));

describe("Profile", () => {
  let initialReduxState = {
    login: JSON.parse(JSON.stringify(loginInitialState)),
    chat: JSON.parse(JSON.stringify(chatInitialState)),
    main: JSON.parse(JSON.stringify(mainInitialState)),
    toilet: JSON.parse(JSON.stringify(toiletInitialState)),
  };

  const wrappedProfileComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/users/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = () => {};
  });

  beforeEach(() => {
    initialReduxState.login.userId = "testId";
    window.history.pushState({}, "", "/users/testId");
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

  test("should render '수정' & '삭제' when user visit myReviewPage", async () => {
    initialReduxState.login.userId = "testId";
    await waitFor(() =>
      render(wrappedProfileComponent, {
        preloadedState: initialReduxState,
      })
    );

    expect(screen.getByText("수정")).toBeInTheDocument();
    expect(screen.getByText("삭제")).toBeInTheDocument();
  });

  test("should not render '수정' & '삭제' when invalid user visit myReviewPage", async () => {
    initialReduxState.login.userId = "invalidId";
    await waitFor(() =>
      render(wrappedProfileComponent, {
        preloadedState: initialReduxState,
      })
    );

    expect(screen.queryByText("수정")).not.toBeInTheDocument();
    expect(screen.queryByText("삭제")).not.toBeInTheDocument();
  });

  test("should render userInfo & review when user visit myReviewPage", async () => {
    initialReduxState.login.userId = "testId";
    await waitFor(() =>
      render(wrappedProfileComponent, {
        preloadedState: initialReduxState,
      })
    );

    expect(screen.getByText("(5)")).toBeInTheDocument();
    expect(screen.getByText("깨끗해요!")).toBeInTheDocument();
    expect(screen.getByText("2022.02.19 01.08")).toBeInTheDocument();
  });
});
