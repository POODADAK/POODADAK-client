import React from "react";
import styled from "styled-components";

import ChatBubbleReceive from "../../common/components/chats/ChatBubbleReceive";
import ChatBubbleSend from "../../common/components/chats/ChatBubbleSend";

const StyledDiv = styled`
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
`;

function ChatBubbleList(chatList, userId) {
  const bubbleList = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const chat of chatList) {
    if (chat.sender === userId) {
      bubbleList.push(<ChatBubbleSend key={chat.date} chat={chat} />);
    } else {
      bubbleList.push(<ChatBubbleReceive key={chat.date} chat={chat} />);
    }
  }

  return (
    <StyledDiv>
      <ChatBubbleReceive />
      <ChatBubbleSend />
    </StyledDiv>
  );
}

export default ChatBubbleList;
