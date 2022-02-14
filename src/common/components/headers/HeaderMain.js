import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import chat from "../../../assets/icon-chat.png";
import menu from "../../../assets/icon-menu.png";
import logo from "../../../assets/logo-main.svg";
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

function HeaderMain({ onClick }) {
  const navigate = useNavigate();

  return (
    <StyledHeaderMain>
      <div className="logo">
        <img src={logo} alt="로고" />
      </div>
      <div className="btns">
        <ButtonDefault icon={chat} onClick={() => navigate("/chats")} />
        <ButtonDefault icon={menu} onClick={onClick} />
      </div>
    </StyledHeaderMain>
  );
}

HeaderMain.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HeaderMain;
