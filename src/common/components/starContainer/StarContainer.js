import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import starEmpty from "../../../assets/icon-star-empty.png";
import starFull from "../../../assets/icon-star-full.png";

const StyledDiv = styled.div`
  margin: 3% 0;
  display: flex;
  align-items: center;
  width: 20%;

  .star {
    width: 17%;
  }

  .rating-number {
    font-size: 0.8rem;
    margin: 0 0.7rem;
  }
`;

function StarContainer({ rating, showRatingNumber }) {
  return (
    <StyledDiv>
      <img className="star" src={starFull} alt="star" />
      <img
        className="star"
        src={rating > 1 ? starFull : starEmpty}
        alt="star"
      />
      <img
        className="star"
        src={rating > 2 ? starFull : starEmpty}
        alt="star"
      />
      <img
        className="star"
        src={rating > 3 ? starFull : starEmpty}
        alt="star"
      />
      <img
        className="star"
        src={rating > 4 ? starFull : starEmpty}
        alt="star"
      />
      {showRatingNumber && <div className="rating-number">{rating}</div>}
    </StyledDiv>
  );
}

StarContainer.propTypes = {
  rating: PropTypes.number.isRequired,
  showRatingNumber: PropTypes.bool,
};

StarContainer.defaultProps = {
  showRatingNumber: true,
};

export default StarContainer;
