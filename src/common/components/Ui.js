import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import check from "../../assets/icon-check-full.png";
import help from "../../assets/icon-help-fluid.png";
import ToiletCard from "../../features/toilet/ToiletCard";
import ButtonDefault from "./buttons/ButtonDefault";
import ButtonFluid from "./buttons/ButtonFluid";
import ButtonFull from "./buttons/ButtonFull";
import ButtonSmall from "./buttons/ButtonSmall";
import ChatBubbleReceive from "./chats/ChatBubbleReceive";
import ChatBubbleSend from "./chats/ChatBubbleSend";
import ChatMsg from "./chats/ChatMsg";
import HeaderChat from "./headers/HeaderChat";
import HeaderMain from "./headers/HeaderMain";
import HeaderSub from "./headers/HeaderSub";
import Input from "./inputs/Input";
import InputChat from "./inputs/InputChat";
import List2Lines from "./lists/List2Lines";
import ListCheck from "./lists/ListCheck";
import ListDefault from "./lists/ListDefault";
import ListNavi from "./lists/ListNavi";
import Sidebar from "./Sidebar";
import Title from "./Title";

const StyledUi = styled.div`
  width: 100%;
  color: beige;
  background-color: gray;
  border: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  h3 {
    margin-bottom: -10px;
  }
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
  const navigate = useNavigate();

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
      <h3>Headers</h3>
      <HeaderMain />
      <HeaderSub />
      <HeaderChat />
      <h3>Lists</h3>
      <ListDefault label="label" />
      <ListCheck label="label" />
      <List2Lines label="label" secondary="secondary" />
      <ListNavi label="label" secondary="secondary" />
      <h3>Title</h3>
      <Title title="Title" description="description" />
      <h3>Sidebar</h3>
      <Sidebar />
      <h3>Routes</h3>
      <ButtonSmall
        onClick={() => {
          navigate("/");
        }}
      >
        메인
      </ButtonSmall>
      <ButtonSmall
        onClick={() => {
          navigate("/toilets");
        }}
      >
        화장실 리스트
      </ButtonSmall>
      <ButtonSmall
        onClick={() => {
          navigate("/toilets/:toilet_id");
        }}
      >
        화장실 개별 페이지
      </ButtonSmall>
      <ButtonSmall
        onClick={() => {
          navigate("/chats");
        }}
      >
        채팅 리스트
      </ButtonSmall>
      <ButtonSmall
        onClick={() => {
          navigate("/chats/:chat_id");
        }}
      >
        채팅방
      </ButtonSmall>
      <ButtonSmall
        onClick={() => {
          navigate("/editReview/:review_id");
        }}
      >
        리뷰작성 및 수정
      </ButtonSmall>
      <ButtonSmall
        onClick={() => {
          navigate("/users/:user_id");
        }}
      >
        프로필(내 리뷰 포함)
      </ButtonSmall>
      <ButtonSmall
        onClick={() => {
          navigate("/editProfile/:user_id");
        }}
      >
        프로필 닉네임 편집
      </ButtonSmall>
      <ToiletCard />
    </StyledUi>
  );
}

export default Ui;
