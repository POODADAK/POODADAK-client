import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

  const [enteredChat, setEnteredChat] = useState("");
  const [chatList, setChatList] = useState([]);
  const [isChatEnd, setIsChatEnd] = useState(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentSocket) {
      const handler = (emittedChatList) => {
        setChatList(emittedChatList);
      };

      currentSocket.once("findExistingChatList", handler);

      return () => {
        currentSocket.off("findExistingChatList", handler);
      };
    }
  }, [currentSocket]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentSocket) {
      const handler = (chat) => {
        setChatList((existingChatList) => [...existingChatList, chat]);
      };

      currentSocket.on("receiveChat", handler);

      return () => {
        currentSocket.off("receiveChat", handler);
      };
    }
  }, [currentSocket]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentSocket) {
      const handler = () => {
        setIsChatEnd(true);
        currentSocket.disconnect();
        dispatch();
      };

      currentSocket.on("leaveChat", handler);

      return () => {
        currentSocket.off("leaveChat", handler);
      };
    }
  }, [currentSocket]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentSocket) {
      const handler = () => {
        setIsChatEnd(true);
        dispatch();
      };

      currentSocket.on("chatTimeout", handler);

      return () => {
        currentSocket.off("chatTimeout", handler);
      };
    }
  }, [currentSocket]);

  useEffect(() => {
    if (currentSocket) {
      currentSocket.emit("loadChatList", currentChatroomId);
    }
  }, [currentSocket]);

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

    if (currentSocket) {
      currentSocket.emit("sendChat", chat);
    }

    setChatList((existingChatList) => [...existingChatList, chat]);
  }

  return (
    <StyledChat>
      <HeaderChat />
      <ChatBubbleList
        chatList={chatList}
        userId={userId}
        isConnection={!!currentSocket}
        isChatEnd={isChatEnd}
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
