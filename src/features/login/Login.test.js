import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { render, screen, cleanup, waitFor } from "../../common/util/testUtils";
import Login from "./Login";

jest.mock("../../common/api/auth", () => ({
  __esModule: true,
  default: () =>
    // eslint-disable-next-line prefer-promise-reject-errors
    Promise.reject({
      response: { data: { errMessage: "testErrorMessage" } },
    }),
}));

describe("ErrorPage", () => {
  const wrappedProfileComponent = (
    <BrowserRouter>
      <Routes>
        <Route path="/login/process" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );

  beforeEach(() => {
    window.history.pushState({}, "", "/login/process");
  });

  afterEach(() => {
    cleanup();
  });

  test("should render error screen with fetched error message when login fails", async () => {
    await waitFor(() => render(wrappedProfileComponent));
    expect(
      screen.getByText("오류 메세지: testErrorMessage")
    ).toBeInTheDocument();
  });
});
