import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import chatEmpty from "../../../assets/icon-chat.png";
import { chatStatusOptions } from "../../../features/chat/chatSlice";
import ButtonDefault from "../buttons/ButtonDefault";

const StyledHeaderSub = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;

  .back {
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

function HeaderSub({ isGoBackButtonMain }) {
  const navigate = useNavigate();
  const chatStatus = useSelector((state) => state.chat.chatStatus);
  const chatroomId = useSelector((state) => state.chat.chatroomId);
  const isChatConnected = chatStatus === chatStatusOptions.connected;

  return (
    <StyledHeaderSub>
      {!isGoBackButtonMain && (
        <div className="back">
          <ButtonDefault moveto="left" onClick={() => navigate(-1)}>
            뒤로가기
          </ButtonDefault>
        </div>
      )}
      {isGoBackButtonMain && (
        <div className="back">
          <ButtonDefault moveto="left" onClick={() => navigate("/")}>
            메인으로
          </ButtonDefault>
        </div>
      )}

      {isChatConnected && (
        <div className="btns">
          <ButtonDefault
            icon={chatEmpty}
            onClick={() => navigate(`/chatroomList/${chatroomId}?toiletId`)}
          />
        </div>
      )}
    </StyledHeaderSub>
  );
}

HeaderSub.propTypes = {
  isGoBackButtonMain: PropTypes.bool,
};

HeaderSub.defaultProps = {
  isGoBackButtonMain: false,
};

export default HeaderSub;
