import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HeaderChat from "../../common/components/headers/HeaderChat";

const StyledChat = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function Chat() {
  // const navigate = useNavigate();

  return (
    <StyledChat>
      <HeaderChat />
    </StyledChat>
  );
}

export default Chat;
