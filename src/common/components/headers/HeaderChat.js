import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import close from "../../../assets/icon-close.png";
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

  return (
    <StyledHeaderChat>
      <div className="back">
        <ButtonDefault moveTo="left" onClick={() => navigate(-2)}>
          채팅창 나가기
        </ButtonDefault>
      </div>
      <div className="btns">
        <ButtonDefault icon={close} onClick={() => navigate("/")}>
          완전종료
        </ButtonDefault>
      </div>
    </StyledHeaderChat>
  );
}

export default HeaderChat;
