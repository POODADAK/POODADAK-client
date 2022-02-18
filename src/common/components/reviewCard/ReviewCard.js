import dayjs from "dayjs";
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
import deleteReview from "../../api/deleteReview";
import { COLOR, USER_LEVEL } from "../../util/constants";
import ButtonFull from "../buttons/ButtonFull";
import ButtonSmall from "../buttons/ButtonSmall";
import Modal from "../modal/Modal";
import StarContainer from "../starContainer/StarContainer";

const ButtonContainer = styled.div`
  position: absolute;
  justify-content: center;
  height: 10%;
  bottom: 0;
  left: 0.7rem;
  right: 0.7rem;
  display: flex;
  border-top: 2px solid ${COLOR.LINE};

  button {
    border: none;
    height: 100%;
  }

  .divider {
    border-left: 1px solid ${COLOR.LINE};
    border-right: 1px solid ${COLOR.LINE};
    height: 100%;
    background-color: ${COLOR.LINE};
  }
`;

const StyledHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 9%;
  padding: 0.4rem;
  display: flex;
  background-color: ${COLOR.DARK_GREY};
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
    color: ${COLOR.LIGHTER_GREY};
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

  .toiletName {
    margin: 0.5rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
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
  toilet,
}) {
  const [showCover, setShowCover] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const navigate = useNavigate();
  const isImage = image !== "none";

  let userRankImageSrc = bronze;

  if (level === USER_LEVEL.GOLD) {
    userRankImageSrc = gold;
  }

  if (level === USER_LEVEL.SILVER) {
    userRankImageSrc = silver;
  }

  if (level === USER_LEVEL.BRONZE) {
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
    navigate(`/editReview/${reviewId}`, { state: toilet });
  }

  function handleToiletNameClick() {
    navigate(`/toilets/${toilet._id}`, { state: toilet });
  }

  function handleModalCloseClick() {
    setModalContent("");
    setShowModal(false);
  }

  function setContentAndShowModal(content) {
    setModalContent(content);
    setShowModal(true);
  }

  function handleReviewDeleteClick() {
    setContentAndShowModal(
      <>
        <div>정말로 삭제 하시겠습니까?</div>
        <ButtonSmall type="button" onClick={handleReviewDeleteConfirmClick}>
          삭제
        </ButtonSmall>
      </>
    );
  }

  async function handleReviewDeleteConfirmClick() {
    try {
      await deleteReview(reviewId);
      navigate(-1);
    } catch (error) {
      setModalContent("리뷰 삭제가 실패하였습니다.");
      setShowModal(true);
    }
  }

  return (
    <StyledDiv>
      {showModal && (
        <Modal onModalCloseClick={handleModalCloseClick}>{modalContent}</Modal>
      )}
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
        <div className="date">
          {dayjs(updatedAt).format("YYYY.MM.DD HH.mm")}
        </div>
      </StyledHeader>
      <div
        className="toiletName"
        onClick={handleToiletNameClick}
        onKeyPress={handleToiletNameClick}
        role="button"
        tabIndex={0}
      >
        {toilet.toiletName}
      </div>
      <StarContainer rating={rating} />
      <p>{description}</p>
      {isImage && (
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
      )}
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
  level: PropTypes.oneOf([
    USER_LEVEL.GOLD,
    USER_LEVEL.SILVER,
    USER_LEVEL.BRONZE,
  ]).isRequired,
  updatedAt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  isMyReview: PropTypes.bool.isRequired,
  reviewId: PropTypes.string.isRequired,
  toilet: PropTypes.shape({
    _id: PropTypes.string,
    toiletType: PropTypes.string,
    toiletName: PropTypes.string,
    roadNameAddress: PropTypes.string,
    indexNameAddress: PropTypes.string,
    isUnisexToilet: PropTypes.bool,
    menToiletBowlNumber: PropTypes.number,
    menUrinalNumber: PropTypes.number,
    menHandicapToiletBowlNumber: PropTypes.number,
    menHandicapUrinalNumber: PropTypes.number,
    menChildrenToiletBowlNumber: PropTypes.number,
    menChildrenUrinalNumber: PropTypes.number,
    ladiesToiletBowlNumber: PropTypes.number,
    ladiesHandicapToiletBowlNumber: PropTypes.number,
    ladiesChildrenToiletBowlNumber: PropTypes.number,
    openTime: PropTypes.string,
    latestToiletPaperInfo: PropTypes.shape({
      lastDate: PropTypes.string,
      isToiletPaper: PropTypes.bool,
    }),
    isSOS: PropTypes.bool,
  }).isRequired,
};

export default ReviewCard;
