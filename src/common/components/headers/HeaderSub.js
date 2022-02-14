import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import chatFull from "../../../assets/icon-chat-full.png";
import chatEmpty from "../../../assets/icon-chat.png";
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

function HeaderSub() {
  const navigate = useNavigate();
  const currentSocket = useSelector((state) => state.chat.currentSocket);
  const hasUncheckedChat = useSelector((state) => state.chat.hasUncheckedChat);

  const chatIcon = hasUncheckedChat ? chatFull : chatEmpty;

  return (
    <StyledHeaderSub>
      <div className="back">
        <ButtonDefault moveTo="left" onClick={() => navigate(-1)}>
          뒤로가기
        </ButtonDefault>
      </div>
      {currentSocket && (
        <div className="btns">
          <ButtonDefault
            icon={chatIcon}
            onClick={() => navigate("/chatroom")}
          />
        </div>
      )}
    </StyledHeaderSub>
  );
}

export default HeaderSub;
