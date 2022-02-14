import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

const BASE_URL = process.env.REACT_APP_AXIOS_BASE_URL;

function Chats() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.login.userId);
  const [chatrooms, setChatrooms] = useState([]);

  async function getToilet(toiletId) {
    const toilet = await axios.get(`${BASE_URL}/toilets/toilet/${toiletId}`);

    return toilet;
  }

  function findLastChat(chatList) {
    const lastChat = chatList[chatList.length - 1];

    return lastChat;
  }

  useEffect(() => {
    async function findMyChatRoooms() {
      const myChatrooms = await axios.get(
        `${BASE_URL}/chatroom/live-chatroom/${userId}`
      );

      setChatrooms(myChatrooms);
    }

    if (userId) findMyChatRoooms();
  }, [userId]);

  return (
    <StyledChats>
      <HeaderSub onClick={() => navigate("/chats")} />
      {chatrooms &&
        chatrooms.map((chatroom) => (
          <>
            <Title title={getToilet(chatroom.toilet).toiletName} />
            <List2Lines
              label={findLastChat(chatroom.chatList).sender}
              secondary={findLastChat(chatroom.chatList).message}
            />
          </>
        ))}
    </StyledChats>
  );
}

export default Chats;
