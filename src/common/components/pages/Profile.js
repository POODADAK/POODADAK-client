import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HeaderSub from "../headers/HeaderSub";

const StyledProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function Profile() {
  // const navigate = useNavigate();

  return (
    <StyledProfile>
      <HeaderSub />
    </StyledProfile>
  );
}

export default Profile;
