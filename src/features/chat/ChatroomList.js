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
  const { toiletId, toiletName } = location.state;
  const currentChatroomId = useSelector((state) => state.chat.chatroomId);

  const [chatroomList, setChatroomList] = useState([]);

  function findLastChat(chatList) {
    if (!chatList.length) {
      return null;
    }

    const lastChat = chatList[chatList.length - 1];

    return lastChat;
  }

  useEffect(() => {
    async function getLiveChatroomList() {
      const { liveChatroomList } = await getLiveChatByToilet(
        toiletId,
        "owner",
        true
      );

      if (!currentChatroomId) {
        setChatroomList(liveChatroomList);
      }
    }

    getLiveChatroomList();
  }, [currentChatroomId]);

  return (
    <StyledChats>
      <HeaderSub onClick={() => navigate("/chatroom")} />
      <Title title={toiletName} />
      {chatroomList.length &&
        chatroomList.map((chatroom) => (
          <List2Lines
            key={chatroom._id}
            label={chatroom.owner.username}
            secondary={
              findLastChat(chatroom.chatList)?.message ||
              "아직 채팅이 없습니다."
            }
            onClick={() => navigate(`/chatroomList/${chatroom._id}`)}
          />
        ))}
    </StyledChats>
  );
}

export default ChatroomList;
