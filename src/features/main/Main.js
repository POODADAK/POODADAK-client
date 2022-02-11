import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ButtonSmall from "../../common/components/buttons/ButtonSmall";
import HeaderMain from "../../common/components/headers/HeaderMain";
import Sidebar from "../../common/components/Sidebar";

const StyledMain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function Main() {
  const navigate = useNavigate();

  return (
    <StyledMain>
      <HeaderMain />
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
      <Sidebar />
    </StyledMain>
  );
}

export default Main;
