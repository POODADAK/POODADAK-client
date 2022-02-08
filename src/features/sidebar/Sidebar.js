import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Kakao from "./Kakao";
import Naver from "./Naver";

const StyledDiv = styled.div`
  margin-left: auto;
  width: 74.5%;
  height: 94.5%;
`;

function Sidebar() {
  return (
    <StyledDiv>
      <Naver />
      <Kakao />
      <Outlet />
    </StyledDiv>
  );
}

export default Sidebar;
