import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import close from "../../../assets/icon-close-full.png";
import bronze from "../../../assets/icon-rank-bronze.png";
import gold from "../../../assets/icon-rank-gold.png";
import silver from "../../../assets/icon-rank-silver.png";
import send from "../../../assets/icon-send-full.png";
import photoReviewCover from "../../../assets/photo-review-cover.png";
import ButtonFull from "../buttons/ButtonFull";
import ButtonSmall from "../buttons/ButtonSmall";
import StarContainer from "../starContainer/StarContainer";

const ButtonContainer = styled.div`
  position: absolute;
  justify-content: center;
  height: 10%;
  bottom: 0;
  left: 0.7rem;
  right: 0.7rem;
  display: flex;
  border-top: 2px solid #3e3e3e;

  button {
    border: none;
    height: 100%;
  }

  .divider {
    border-left: 1px solid #3e3e3e;
    border-right: 1px solid #3e3e3e;
    height: 100%;
    background-color: #3e3e3e;
  }
`;

const StyledHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 9%;
  padding: 0.4rem;
  display: flex;
  background-color: #3c3c3c;
  justify-content: flex-start;
  align-items: center;

  .rank {
    height: 100%;
  }

  .username {
    color: white;
    margin-left: 2%;
  }

  .date {
    color: #828282;
    font-size: 0.8rem;
    margin-left: auto;
  }
`;

const StyledDiv = styled.div`
  box-sizing: border-box;
  padding: 1.5rem 0.7rem 0 0.7rem;
  position: relative;
  width: 100%;
  height: 477px;
  background-color: black;
  color: white;
`;

const PhotoReviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40%;
  background-image: url(${(props) => props.imageSrc});
  background-size: contain;
  background-repeat: no-repeat;

  .photo-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.coverSrc});
    background-size: 100% 100%;
    display: flex;
    align-items: center;
  }

  .photo-cover-background-color {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);

    button {
      border: none;
    }
  }

  .warning {
    margin: 2% auto;
    white-space: pre;
    text-align: center;
  }
`;

function ReviewCard({
  userId,
  username,
  level,
  updatedAt,
  image,
  description,
  rating,
  isMyReview,
  reviewId,
}) {
  const [showCover, setShowCover] = useState(true);
  const navigate = useNavigate();

  let userRankImageSrc = bronze;

  if (level === "GOLD") {
    userRankImageSrc = gold;
  }

  if (level === "SILVER") {
    userRankImageSrc = silver;
  }

  if (level === "BRONZE") {
    userRankImageSrc = bronze;
  }

  function handleCoverClick(event) {
    event.stopPropagation();
    setShowCover(false);
  }

  function handlePhotoReviewClick() {
    setShowCover(true);
  }

  function handleUsernameClick() {
    navigate(`/users/${userId}`);
  }

  function handleReviewEditClick() {
    navigate(`/editReview/${reviewId}`);
  }

  function handleReviewDeleteClick() {
    // 차후 리뷰 삭제 로직 구현 필요
  }

  return (
    <StyledDiv>
      <StyledHeader>
        <img className="rank" src={userRankImageSrc} alt="rank" />
        <div
          className="username"
          onClick={handleUsernameClick}
          onKeyPress={handleUsernameClick}
          role="button"
          tabIndex={0}
        >
          {username}
        </div>
        <div className="date">{updatedAt}</div>
      </StyledHeader>
      <StarContainer rating={rating} />
      <p>{description}</p>
      <PhotoReviewContainer
        imageSrc={image}
        coverSrc={photoReviewCover}
        onClick={handlePhotoReviewClick}
      >
        {showCover && (
          <div className="photo-cover">
            <div className="photo-cover-background-color">
              <p className="warning">
                {
                  "불쾌한 이미지가 있을 수 있어서 흐림 처리 해두었습니다.\n보고 싶으면 클릭해주세요."
                }
              </p>
              <ButtonSmall type="button" onClick={handleCoverClick}>
                이미지 보기
              </ButtonSmall>
            </div>
          </div>
        )}
      </PhotoReviewContainer>
      {isMyReview && (
        <ButtonContainer>
          <ButtonFull
            type="button"
            onClick={handleReviewEditClick}
            icon={send}
            disabled={false}
          >
            수정
          </ButtonFull>
          <div className="divider" />
          <ButtonFull
            type="button"
            onClick={handleReviewDeleteClick}
            icon={close}
            disabled={false}
          >
            삭제
          </ButtonFull>
        </ButtonContainer>
      )}
    </StyledDiv>
  );
}

ReviewCard.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  level: PropTypes.oneOf(["GOLD", "SILVER", "BRONZE"]).isRequired,
  updatedAt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  isMyReview: PropTypes.bool.isRequired,
  reviewId: PropTypes.string.isRequired,
};

export default ReviewCard;
