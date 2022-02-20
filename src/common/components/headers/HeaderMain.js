import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import chatEmpty from "../../../assets/icon-chat.png";
import menu from "../../../assets/icon-menu.png";
import logo from "../../../assets/logo-main.svg";
import { chatStatusOptions } from "../../../features/chat/chatSlice";
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

function HeaderMain({ onClick, isMainStarted }) {
  const navigate = useNavigate();
  const chatroomId = useSelector((state) => state.chat.chatroomId);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const chatStatus = useSelector((state) => state.chat.chatStatus);
  const isChatConnected = chatStatus === chatStatusOptions.connected;

  return (
    <StyledHeaderMain>
      <div className="logo">
        <img src={logo} alt="로고" />
      </div>
      {!isMainStarted && (
        <div className="btns">
          {isLoggedIn && isChatConnected && (
            <ButtonDefault
              icon={chatEmpty}
              onClick={() => navigate(`/chatroomList/${chatroomId}`)}
            />
          )}
          <ButtonDefault icon={menu} onClick={onClick} />
        </div>
      )}
    </StyledHeaderMain>
  );
}

HeaderMain.propTypes = {
  onClick: PropTypes.func.isRequired,
  isMainStarted: PropTypes.bool.isRequired,
};

export default HeaderMain;
