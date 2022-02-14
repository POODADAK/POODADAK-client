import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledChatBubbleSend = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .msg {
    max-width: 70%;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .bubble {
    font-size: small;
    font-weight: bold;
    color: white;
    background-color: #bc955c;
    padding: 0.8rem;
    border: none;
    border-radius: 1rem;
    margin-right: 1rem;
  }

  .chat-time {
    font-size: x-small;
    margin-right: 1rem;
    color: ${COLOR.GREY};
  }

  img {
    width: 100%;
    margin-top: 0.4rem;
  }
`;

function ChatBubbleSend({ chat }) {
  const formattedDate = dayjs(chat.date).format("HH.mm");

  return (
    <StyledChatBubbleSend>
      <div className="msg">
        <div className="bubble">{chat.message}</div>
        <div className="chat-time">{formattedDate}</div>
      </div>
    </StyledChatBubbleSend>
  );
}

ChatBubbleSend.propTypes = {
  chat: PropTypes.shape({
    message: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChatBubbleSend;
