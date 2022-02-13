import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HeaderChat from "../../common/components/headers/HeaderChat";
import InputChat from "../../common/components/inputs/InputChat";
import ChatBubbleList from "./ChatBubbleList";

const StyledChat = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;

  .chat-container {
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
  }
`;

function Chatroom() {
  const currentSocket = useSelector((state) => state.chat.currentSocket);
  const userId = useSelector((state) => state.login.userId);
  const currentChatroomId = useSelector(
    (state) => state.chat.currentChatroomId
  );

  const [entredChat, setEnteredChat] = useState();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const handler = (emittedChatList) => {
      setChatList(emittedChatList);
    };

    currentSocket.on("findChatList", handler);

    return () => {
      currentSocket.off("findChatList", handler);
    };
  }, [currentSocket]);

  useEffect(() => {
    const handler = (chat) => {
      setChatList((existingChatList) => [...existingChatList, chat]);
    };

    currentSocket.on("receiveChat", handler);

    return () => {
      currentSocket.off("receiveChat", handler);
    };
  }, [currentSocket]);

  useEffect(() => {
    currentSocket.emit("loadChatList", currentChatroomId);
  }, [currentSocket]);

  function handleChatInput(event) {
    setEnteredChat(event.target.value);
  }

  function handleChatSubmit(event) {
    event.preventDefault();
    setEnteredChat("");
    const chat = {
      sender: userId,
      message: entredChat,
      date: new Date().toISOString(),
    };

    currentSocket.emit("sendChat", chat);
    setChatList((existingChatList) => [...existingChatList, chat]);
  }

  return (
    <StyledChat>
      <HeaderChat />
      <ChatBubbleList chatList={chatList} userId={userId} />
      <InputChat
        chat={entredChat}
        onChange={handleChatInput}
        onSubmit={handleChatSubmit}
      />
    </StyledChat>
  );
}

export default Chatroom;
