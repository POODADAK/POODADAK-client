import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import chatEmpty from "../../../assets/icon-chat.png";
import menu from "../../../assets/icon-menu.png";
import logo from "../../../assets/logo-main.svg";
import { socketStatusOptions } from "../../../features/chat/chatSlice";
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
  const chatroomId = useSelector((state) => state.chat.chatroomId);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const socketStatus = useSelector((state) => state.chat.socketStatus);

  const isSocketConnected = socketStatus === socketStatusOptions.connected;

  return (
    <StyledHeaderMain>
      <div className="logo">
        <img src={logo} alt="로고" />
      </div>
      <div className="btns">
        {isLoggedIn && isSocketConnected && (
          <ButtonDefault
            icon={chatEmpty}
            onClick={() => navigate(`/chatroomList/${chatroomId}`)}
          />
        )}
        <ButtonDefault icon={menu} onClick={onClick} />
      </div>
    </StyledHeaderMain>
  );
}

HeaderMain.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HeaderMain;
