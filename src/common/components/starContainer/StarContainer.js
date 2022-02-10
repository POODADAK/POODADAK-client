import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import starEmpty from "../../../assets/icon-star-empty.png";
import starFull from "../../../assets/icon-star-full.png";
import starHalf from "../../../assets/icon-star-half.png";

const StyledDiv = styled.div`
  margin: 3% 0;
  display: flex;
  align-items: center;
  width: ${(props) => props.width};

  .star {
    width: 100%;
    height: 100%;
  }

  .rating-number {
    font-size: 0.8rem;
    margin: 0 0.7rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 17%;
`;

function StarContainer({ rating, showRatingNumber, onClick, width }) {
  function starClickHandler(starNumber) {
    onClick(starNumber);
  }

  function setStarImageByRating(
    emptyStarThreshold,
    halfStarThreshold,
    ratingInput
  ) {
    let imageSrc = starEmpty;

    if (ratingInput > emptyStarThreshold) {
      if (ratingInput < halfStarThreshold) {
        imageSrc = starHalf;
      }
      imageSrc = starFull;
    }

    return imageSrc;
  }

  return (
    <StyledDiv width={width}>
      <ImageContainer onClick={starClickHandler.bind(this, 1)}>
        <img className="star" src={starFull} alt="star" />
      </ImageContainer>
      <ImageContainer onClick={starClickHandler.bind(this, 2)}>
        <img
          className="star"
          src={setStarImageByRating(1, 2, rating)}
          alt="star"
        />
      </ImageContainer>
      <ImageContainer onClick={starClickHandler.bind(this, 3)}>
        <img
          className="star"
          src={setStarImageByRating(2, 3, rating)}
          alt="star"
        />
      </ImageContainer>
      <ImageContainer onClick={starClickHandler.bind(this, 4)}>
        <img
          className="star"
          src={setStarImageByRating(3, 4, rating)}
          alt="star"
        />
      </ImageContainer>
      <ImageContainer onClick={starClickHandler.bind(this, 5)}>
        <img
          className="star"
          src={setStarImageByRating(4, 5, rating)}
          alt="star"
        />
      </ImageContainer>
      {showRatingNumber && <div className="rating-number">{rating}</div>}
    </StyledDiv>
  );
}

StarContainer.propTypes = {
  rating: PropTypes.number.isRequired,
  showRatingNumber: PropTypes.bool,
  onClick: PropTypes.func,
  width: PropTypes.string,
};

StarContainer.defaultProps = {
  showRatingNumber: true,
  onClick: () => {},
  width: "20%",
};

export default StarContainer;
