import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import HeaderSub from "../../common/components/headers/HeaderSub";
import StarContainer from "../../common/components/starContainer/StarContainer";
import { COLOR } from "../../common/util/constants";

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;

  .title {
    color: ${COLOR.LIGHTGOLD};
  }
`;

const StyledMain = styled.main`
  padding: 0 5%;

  .test {
    width: 50%;
  }
`;

const StarInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: ${COLOR.GREY};
  margin: 0 auto;
  font-size: 1.5rem;
`;

function ReviewEdit() {
  const [enteredRating, setEnteredRating] = useState(1);
  // const navigate = useNavigate();

  function starClickHandler(starNumber) {
    setEnteredRating(starNumber);
  }

  return (
    <StyledDiv>
      <HeaderSub />
      <StyledMain>
        <h1 className="title">리뷰남기기</h1>
        <StarInput>
          청결도 점수
          <StarContainer
            rating={enteredRating}
            showRatingNumber={false}
            onClick={starClickHandler}
            width="50%"
          />
        </StarInput>
      </StyledMain>
    </StyledDiv>
  );
}

export default ReviewEdit;
