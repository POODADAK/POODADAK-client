import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import HeaderChat from "../../common/components/headers/HeaderChat";
import InputChat from "../../common/components/inputs/InputChat";
import {
  socketConnected,
  socketEmitted,
} from "../../common/middlewares/socketMiddleware";
import ChatBubbleList from "./ChatBubbleList";
import { chatReceived, socketStatusOptions } from "./chatSlice";

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
  const userId = useSelector((state) => state.login.userId);
  const socketStatus = useSelector((state) => state.chat.socketStatus);
  const chatList = useSelector((state) => state.chat.chatList);
  const dispatch = useDispatch();
  const { chatroomId } = useParams();

  const [enteredChat, setEnteredChat] = useState("");
  // const [isChatEnd, setIsChatEnd] = useState(false);
  const { search } = useLocation();
  const toiletId = search.split("=")[1];

  // console.log(socketStatus);
  const isSocketConnected = socketStatus === socketStatusOptions.connected;

  useEffect(() => {
    dispatch(socketConnected("toiletId", toiletId, userId, chatroomId));
  }, []);

  function handleChatInput(event) {
    setEnteredChat(event.target.value);
  }

  function handleChatSubmit(event) {
    event.preventDefault();

    const isChatEmpty = !enteredChat.trim().length;

    if (isChatEmpty) {
      return;
    }

    const chat = {
      sender: userId,
      message: enteredChat,
      date: new Date().toISOString(),
    };

    setEnteredChat("");
    dispatch(socketEmitted("sendChat", chat));

    dispatch(chatReceived(chat));
  }

  return (
    <StyledChat>
      <HeaderChat />
      <ChatBubbleList
        chatList={chatList}
        userId={userId}
        isConnection={isSocketConnected}
        // isChatEnd={}
      />
      <InputChat
        chat={enteredChat}
        onChange={handleChatInput}
        onSubmit={handleChatSubmit}
      />
    </StyledChat>
  );
}

export default Chatroom;
