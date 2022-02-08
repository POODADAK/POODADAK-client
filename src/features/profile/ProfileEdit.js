import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HeaderSub from "../../common/components/headers/HeaderSub";

const StyledProfileEdit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function ProfileEdit() {
  // const navigate = useNavigate();

  return (
    <StyledProfileEdit>
      <HeaderSub />
    </StyledProfileEdit>
  );
}

export default ProfileEdit;
