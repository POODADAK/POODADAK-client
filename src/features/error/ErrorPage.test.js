import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen, cleanup, waitFor } from "../../common/util/testUtils";
import ErrorPage from "./ErrorPage";

describe("ErrorPage", () => {
  const wrappedProfileComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );

  beforeEach(() => {
    window.history.pushState({}, "", "/error");
  });

  afterEach(() => {
    cleanup();
  });

  test("should render error with error message", async () => {
    jest.mock("react-router-dom", () => {
      const originalModule = jest.requireActual("react-router-dom");

      return {
        __esModule: true,
        ...originalModule,
        useLocation: () => ({
          state: {
            error: {
              title: "404 Not Found!",
              errorMsg: "잘못된 접근입니다!",
              description: "url을 확인해 주세요!",
            },
          },
        }),
      };
    });

    await waitFor(() => render(wrappedProfileComponent));

    expect(screen.getByText("404 Not Found!")).toBeInTheDocument();
    expect(screen.getByText("잘못된 접근입니다!")).toBeInTheDocument();
    expect(screen.getByText("url을 확인해 주세요!")).toBeInTheDocument();
    expect(screen.getByText("메인으로 가기")).toBeInTheDocument();
  });
});
