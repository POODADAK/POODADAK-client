import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import getLiveChatByToilet from "../../common/api/getLiveChatByToilet";
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

function ChatroomList() {
  const navigate = useNavigate();
  const location = useLocation();
  const toilet = location.state;
  const currentChatroomId = useSelector((state) => state.chat.chatroomId);

  const [chatroomList, setChatroomList] = useState([]);

  function findLastChat(chatList) {
    const lastChat = chatList[chatList.length - 1];

    return lastChat;
  }

  useEffect(() => {
    async function getLiveChatroomList() {
      const liveChatroomList = await getLiveChatByToilet();
      return liveChatroomList;
    }
    if (!currentChatroomId) {
      setChatroomList(getLiveChatroomList());
    }
  }, [currentChatroomId]);

  return (
    <StyledChats>
      <HeaderSub onClick={() => navigate("/chatroom")} />
      <Title title={toilet.toiletName} />
      {chatroomList &&
        chatroomList.map((chatroom) => (
          <List2Lines
            label={findLastChat(chatroom.chatList).sender}
            secondary={findLastChat(chatroom.chatList).message}
            onClick={navigate(`chatroomList/${chatroom.chatroomId}`)}
          />
        ))}
    </StyledChats>
  );
}

export default ChatroomList;
