import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import getChatroom from "../../common/api/getChatroom";
import HeaderChat from "../../common/components/headers/HeaderChat";
import InputChat from "../../common/components/inputs/InputChat";
import {
  socketConnected,
  socketEmitted,
} from "../../common/middlewares/socketMiddleware";
import ChatBubbleList from "./ChatBubbleList";
import {
  chatReceived,
  participantStatusOptions,
  socketStatusOptions,
} from "./chatSlice";

const StyledChat = styled.div`
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  background-color: black;

  .chat-container {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column-reverse;
  }
`;

function Chatroom() {
  const userId = useSelector((state) => state.login.userId);
  const socketStatus = useSelector((state) => state.chat.socketStatus);
  const participantStatus = useSelector(
    (state) => state.chat.participantStatus
  );
  const chatList = useSelector((state) => state.chat.chatList);
  const dispatch = useDispatch();
  const { chatroomId } = useParams();

  const [enteredChat, setEnteredChat] = useState("");

  const isSocketConnected = socketStatus === socketStatusOptions.connected;
  const isParticipantLeft =
    participantStatus === participantStatusOptions.participantLeft;

  useEffect(() => {
    async function checkIsChatroomLiveAndConnect() {
      const chatroom = await getChatroom(chatroomId);

      if (chatroom.isLive) {
        dispatch(
          socketConnected(
            "toiletId",
            chatroom.toilet,
            chatroom.owner,
            chatroomId
          )
        );
      }
    }

    checkIsChatroomLiveAndConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="chat-container">
        <ChatBubbleList
          chatList={chatList}
          userId={userId}
          isConnection={isSocketConnected}
          isParticipantLeft={isParticipantLeft}
        />
      </div>
      <InputChat
        chat={enteredChat}
        onChange={handleChatInput}
        onSubmit={handleChatSubmit}
      />
    </StyledChat>
  );
}

export default Chatroom;
