import { render } from "@testing-library/react";
import React from "react";

import Main from "./Main";

// 테스트 실패사례 입니다.
describe("Main Component", () => {
  it("should have 푸다닥 text", () => {
    const { getByText } = render(<Main />);
    expect(getByText("푸다닥")).toBeInTheDocument();
  });
});
