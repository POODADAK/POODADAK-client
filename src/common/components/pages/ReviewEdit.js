import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HeaderSub from "../headers/HeaderSub";

const StyledReviewEdit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function ReviewEdit() {
  // const navigate = useNavigate();

  return (
    <StyledReviewEdit>
      <HeaderSub />
    </StyledReviewEdit>
  );
}

export default ReviewEdit;
