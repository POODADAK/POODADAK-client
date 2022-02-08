import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HeaderSub from "../headers/HeaderSub";

const StyledToilets = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function Toilets() {
  // const navigate = useNavigate();

  return (
    <StyledToilets>
      <HeaderSub />
    </StyledToilets>
  );
}

export default Toilets;
