import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import HeaderSub from "../../common/components/headers/HeaderSub";
import List2Lines from "../../common/components/lists/List2Lines";
import Title from "../../common/components/Title";

const StyledChats = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function Chats() {
  const navigate = useNavigate();
  const location = useLocation();
  const toilet = location.state;

  return (
    <StyledChats>
      <HeaderSub onClick={() => navigate("/chats")} />
      <Title
        title={toilet ? `${toilet.name} 채팅 목록` : "{toilet.name} 채팅 목록"}
      />
      {/* <List2Lines
        label={user ? user.name : "{user.name}"}
        secondary={chat ? chat.latestMsg : "{chat.latestMsg}"}
      /> */}
      <List2Lines label="{user.name}" secondary="{chat.latestMsg}" />
    </StyledChats>
  );
}

export default Chats;
