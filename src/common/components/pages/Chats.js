import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HeaderSub from "../headers/HeaderSub";

const StyledChats = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function Chats() {
  // const navigate = useNavigate();

  return (
    <StyledChats>
      <HeaderSub />
    </StyledChats>
  );
}

export default Chats;
