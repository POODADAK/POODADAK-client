import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledChatMsg = styled.div`
  width: 100%;
  font-size: small;
  font-weight: 400;
  color: #bc955c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ChatMsg({ message }) {
  return <StyledChatMsg>{message}</StyledChatMsg>;
}

ChatMsg.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ChatMsg;
