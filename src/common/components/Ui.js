import React from "react";
import styled from "styled-components";

import check from "../../assets/icon-check-full.png";
import help from "../../assets/icon-help-fluid.png";
import ButtonDefault from "./buttons/ButtonDefault";
import ButtonFluid from "./buttons/ButtonFluid";
import ButtonFull from "./buttons/ButtonFull";
import ButtonSmall from "./buttons/ButtonSmall";
import ChatBubbleReceive from "./chats/ChatBubbleReceive";
import ChatBubbleSend from "./chats/ChatBubbleSend";
import ChatMsg from "./chats/ChatMsg";
import Input from "./inputs/Input";
import InputChat from "./inputs/InputChat";

const StyledUi = styled.div`
  width: 100%;
  height: 97vh;
  color: beige;
  background-color: gray;
  border: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const chatR = {
  message:
    "받은 메시지 예시 입니다. 길게 쓰면 이렇게 떨어지죠. 길게 쓰면 이렇게 됩니다.",
  date: "2022.01.01 12:30",
};

const chatS = {
  message:
    "보낸 메시지 예시 입니다. 길게 쓰면 이렇게 떨어지죠. 길게 쓰면 이렇게 됩니다.",
  date: "2022.01.01 12:30",
};

function Ui() {
  return (
    <StyledUi>
      <h3>Buttons</h3>
      <ButtonSmall>ButtonSmall</ButtonSmall>
      <ButtonDefault moveTo="left">ButtonDefault</ButtonDefault>
      <ButtonFull icon={check}>ButtonFull</ButtonFull>
      <ButtonFluid icon={help} color="#EB5757">
        ButtonFluid
      </ButtonFluid>
      <h3>Inputs</h3>
      <Input label="닉네임 입력" placeholder="닉네임을 입력하세요." />
      <InputChat />
      <h3>Chats</h3>
      <ChatMsg type="date" message="2022.12.31" />
      <ChatMsg type="important" message="중요한 메시지 입니다." />
      <ChatBubbleReceive chat={chatR} />
      <ChatBubbleSend chat={chatS} />
    </StyledUi>
  );
}

export default Ui;
