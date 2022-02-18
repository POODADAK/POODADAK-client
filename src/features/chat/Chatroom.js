import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import getChatroom from "../../common/api/getChatroom";
import HeaderChat from "../../common/components/headers/HeaderChat";
import InputChat from "../../common/components/inputs/InputChat";
import Modal from "../../common/components/modal/Modal";
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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const isSocketConnected = socketStatus === socketStatusOptions.connected;
  const isParticipantLeft =
    participantStatus === participantStatusOptions.participantLeft;

  useEffect(() => {
    async function checkIsChatroomLiveAndConnect() {
      try {
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
      } catch (error) {
        setContentAndShowModal(
          <>
            <p>채팅방을 불러오지 못했습니다!</p>
            <p>{`${error.response.data.status} :  ${error.response.data.errMessage}`}</p>
          </>
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

  function handleModalCloseClick() {
    setModalContent("");
    setShowModal(false);
  }

  function setContentAndShowModal(content) {
    setModalContent(content);
    setShowModal(true);
  }

  return (
    <StyledChat>
      {showModal && (
        <Modal onModalCloseClick={handleModalCloseClick}>{modalContent}</Modal>
      )}
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
