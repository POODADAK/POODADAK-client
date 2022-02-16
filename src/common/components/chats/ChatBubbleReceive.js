import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledChatBubbleReceive = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  .msg {
    max-width: 70%;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .bubble {
    font-size: small;
    color: white;
    background-color: ${COLOR.CYAN};
    padding: 0.8rem;
    border-radius: 1rem;
    margin-left: 1rem;
  }

  .chat-time {
    font-size: x-small;
    margin-left: 0.5rem;
    color: ${COLOR.GREY};
    margin-left: 1rem;
  }
`;

function ChatBubbleReceive({ chat }) {
  const formattedDate = dayjs(chat.date).format("HH.mm");

  return (
    <StyledChatBubbleReceive>
      <div className="msg">
        <div className="bubble">{chat.message}</div>
        <div className="chat-time">{formattedDate}</div>
      </div>
    </StyledChatBubbleReceive>
  );
}

ChatBubbleReceive.propTypes = {
  chat: PropTypes.shape({
    message: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatBubbleReceive;
