import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import close from "../../../assets/icon-close.png";
import { socketStatusOptions } from "../../../features/chat/chatSlice";
import { socketDisconnected } from "../../middlewares/socketMiddleware";
import ButtonDefault from "../buttons/ButtonDefault";

const StyledHeaderChat = styled.div`
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

function HeaderChat() {
  const navigate = useNavigate();
  const socketStatus = useSelector((state) => state.chat.socketStatus);
  const lastVisitedToilet = useSelector(
    (state) => state.login.lastVisitedToilet
  );
  const dispatch = useDispatch();

  const isSocketOpen = socketStatus === socketStatusOptions.connected;

  function handleChatEndClick() {
    dispatch(socketDisconnected());
    navigate(-1);
  }

  function handleGoBackClick() {
    navigate(`/toilets/${lastVisitedToilet}`);
  }

  return (
    <StyledHeaderChat>
      <div className="back">
        <ButtonDefault moveto="left" onClick={handleGoBackClick}>
          채팅창 나가기
        </ButtonDefault>
      </div>
      <div className="btns">
        {isSocketOpen && (
          <ButtonDefault icon={close} onClick={handleChatEndClick}>
            완전종료
          </ButtonDefault>
        )}
      </div>
    </StyledHeaderChat>
  );
}

export default HeaderChat;
