import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import ChatBubbleReceive from "../../common/components/chats/ChatBubbleReceive";
import ChatBubbleSend from "../../common/components/chats/ChatBubbleSend";
import { COLOR } from "../../common/util/constants";

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  .chat-announcement {
    text-align: center;
    color: ${COLOR.CARROT};
  }
`;

function ChatBubbleList({ chatList, userId, isConnection, isParticipantLeft }) {
  const bubbleList = [];
  const scrollMarker = useRef();

  useEffect(() => {
    scrollMarker.current.scrollIntoView(false);
  });

  for (const chat of chatList) {
    if (chat.sender === userId) {
      bubbleList.push(<ChatBubbleSend key={chat.date} chat={chat} />);
    } else {
      bubbleList.push(<ChatBubbleReceive key={chat.date} chat={chat} />);
    }
  }

  return (
    <StyledDiv>
      {bubbleList}
      {isParticipantLeft && (
        <p className="chat-announcement">상대방이 채팅을 종료 했습니다.</p>
      )}
      {!isConnection && (
        <p className="chat-announcement">현재 연결된 채팅이 없습니다.</p>
      )}
      <div ref={scrollMarker} />
    </StyledDiv>
  );
}

ChatBubbleList.propTypes = {
  chatList: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  userId: PropTypes.string.isRequired,
  isConnection: PropTypes.bool.isRequired,
  isParticipantLeft: PropTypes.bool.isRequired,
};

export default ChatBubbleList;
