import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import getLiveChatByToilet from "../../common/api/getLiveChatByToilet";
import HeaderSub from "../../common/components/headers/HeaderSub";
import List2Lines from "../../common/components/lists/List2Lines";
import Modal from "../../common/components/modal/Modal";
import Title from "../../common/components/Title";

const StyledChats = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function ChatroomList() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { toiletId, toiletName } = location.state;
  const currentChatroomId = useSelector((state) => state.chat.chatroomId);

  const [chatroomList, setChatroomList] = useState([]);

  useEffect(() => {
    async function getLiveChatroomList() {
      try {
        const { liveChatroomList } = await getLiveChatByToilet(
          toiletId,
          "owner",
          true
        );

        if (!currentChatroomId) {
          setChatroomList(liveChatroomList);
        }
      } catch (error) {
        setContentAndShowModal(
          <>
            <p>구조요청 목록을 불러오지 못했습니다!</p>
            <p>{`${error.response.data.status} :  ${error.response.data.errMessage}`}</p>
          </>
        );
      }
    }

    getLiveChatroomList();
  }, [currentChatroomId]);

  function findLastChat(chatList) {
    if (!chatList.length) {
      return null;
    }

    const lastChat = chatList[chatList.length - 1];

    return lastChat;
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
    <StyledChats>
      {showModal && (
        <Modal onModalCloseClick={handleModalCloseClick}>{modalContent}</Modal>
      )}
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
