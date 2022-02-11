import React from "react";
import styled from "styled-components";

import check from "../../assets/icon-check-full.png";
import help from "../../assets/icon-help-fluid.png";
import toiletSample from "../../assets/toilet-sample.jpeg";
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
import ReviewCard from "./reviewCard/ReviewCard";
import Sidebar from "./Sidebar";
import StarContainer from "./starContainer/StarContainer";
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
      <ListDefault label="label" secondary="secondary" />
      <ListCheck label="label" />
      <List2Lines label="label" secondary="secondary" />
      <ListNavi label="label" secondary="secondary" />
      <h3>Title</h3>
      <Title title="Title" description="description" />
      <h3>Sidebar</h3>
      <Sidebar />
      <h3>ToiletCard</h3>
      <ToiletCard />
      <h3>ReviewCard</h3>
      <ReviewCard
        username="test"
        level="GOLD"
        updatedAt="2022.02.09"
        image={toiletSample}
        description="예시리뷰뷰뷰뷰뷰뷰뷰뷰예시리뷰뷰뷰뷰뷰뷰뷰뷰예시리뷰뷰뷰뷰뷰뷰뷰뷰예시리뷰뷰뷰뷰뷰뷰뷰뷰예시리뷰뷰뷰뷰뷰뷰뷰뷰예시리뷰뷰뷰뷰뷰뷰뷰뷰예시리뷰뷰뷰뷰뷰뷰뷰뷰예시리뷰뷰뷰뷰뷰뷰뷰뷰"
        rating="4"
        // eslint-disable-next-line react/jsx-boolean-value
        isMyReview={true}
      />
      <h3>StarContainer</h3>
      <StarContainer rating={4} />
    </StyledUi>
  );
}

export default Ui;
