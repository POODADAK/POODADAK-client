import { render } from "@testing-library/react";
import React from "react";

import Start from "./Start";

// <Main />가 렌더링 될 때 <Start /> 컴포넌트를 불러와서 잘 렌더링 되는지 확인하는 테스트 예제 입니다.
describe("Main Component", () => {
  it("should have 푸다닥 text", () => {
    const { getByText } = render(<Start />);
    expect(getByText("푸다닥")).toBeInTheDocument();
  });
});
