import React from "react";
import styled from "styled-components";

import chat from "../../../assets/icon-chat.png";
import menu from "../../../assets/icon-menu.png";
import logo from "../../../assets/logo-main.png";
import ButtonDefault from "../buttons/ButtonDefault";

const StyledHeaderMain = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;

  .logo {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .btns {
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
`;

function HeaderMain() {
  return (
    <StyledHeaderMain>
      <div className="logo">
        <img src={logo} alt="로고" />
      </div>
      <div className="btns">
        <ButtonDefault icon={chat} />
        <ButtonDefault icon={menu} />
      </div>
    </StyledHeaderMain>
  );
}

export default HeaderMain;
