import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import submitIcon from "../../assets/icon-check-full.png";
import documentIcon from "../../assets/icon-docu-fluid.png";
import toiletPaperCheckEmpty from "../../assets/toilet-paper-check-empty.png";
import toiletPaperCheckFull from "../../assets/toilet-paper-check-full.png";
import { fetchS3Url, uploadImageToS3 } from "../../common/api/s3";
import saveReview from "../../common/api/saveReview";
import ButtonFull from "../../common/components/buttons/ButtonFull";
import ButtonSmall from "../../common/components/buttons/ButtonSmall";
import HeaderSub from "../../common/components/headers/HeaderSub";
import Modal from "../../common/components/modal/Modal";
import StarContainer from "../../common/components/starContainer/StarContainer";
import { COLOR } from "../../common/util/constants";

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;

  .title {
    color: ${COLOR.LIGHT_GOLD};
  }
`;

const StyledMain = styled.main`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 95%;
  padding: 0 5%;

  .test {
    width: 50%;
  }

  .image-upload-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${COLOR.GREY};

    p {
      text-align: center;
    }
  }

  .image-upload-button {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: large;
    color: white;
    background-color: ${COLOR.HEAVY_GOLD};
    border-radius: 8px;

    .icon {
      margin-right: 0.5rem;
    }
    input {
      display: none;
    }

    label {
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }

  button {
    border: none;
  }

  button:last-child {
    width: 112%;
    border-top: 1px solid ${COLOR.LINE};
    margin: 0 -6%;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 30%;
    resize: none;
    font-family: inherit;
    font-size: inherit;
    margin-bottom: 1rem;
  }
`;

const UploadedImageContainer = styled.div`
  width: 100%;
  height: 13rem;
  margin-bottom: 1rem;
  background-image: url(${(props) => props.imageSrc});
  background-size: contain;
  background-repeat: no-repeat;

  img {
    height: 100%;
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

const ToiletPaperCheckContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: ${COLOR.HEAVY_GOLD};
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.LINE};

  .check-image-container {
    width: 5%;
    height: 5%;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

function ReviewEdit({ toiletId }) {
  const [enteredRating, setEnteredRating] = useState(1);
  const [enteredToiletPaper, setEnteredToiletPaper] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [enteredText, setEnteredText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  function starClickHandler(starNumber) {
    setEnteredRating(starNumber);
  }

  function handleToiletPaperCheckClick() {
    setEnteredToiletPaper((state) => !state);
  }

  function handleTextAreaInput(event) {
    setEnteredText(event.target.value);
  }

  function handleImageUpload(event) {
    setUploadedImage(event.target.files[0]);
  }

  function handleModalCloseClick() {
    setModalMessage("");
    setShowModal(false);
  }

  function setContentAndShowModal(message) {
    setModalMessage(message);
    setShowModal(true);
  }

  async function handleSubmitClick() {
    if (!enteredText.trim().length || enteredText.trim().length > 300) {
      setContentAndShowModal("리뷰는 1자 이상 300자 이하여야 합니다.");
      return;
    }

    try {
      const s3UploadUrl = await fetchS3Url();
      let imageUrl;

      if (uploadedImage) {
        imageUrl = await uploadImageToS3(s3UploadUrl, uploadedImage);
      } else {
        imageUrl = "none";
      }

      saveReview({
        toilet: toiletId,
        rating: enteredRating,
        description: enteredText,
        image: imageUrl,
        didToiletPaperExist: enteredToiletPaper,
        updatedAt: new Date().toISOString(),
      });
      setContentAndShowModal(
        <>
          <div>업로드 완료!</div>
          <ButtonSmall type="button" onClick={() => navigate(-1)}>
            돌아가기
          </ButtonSmall>
        </>
      );
    } catch (error) {
      setContentAndShowModal("업로드 실패... 나중에 다시 시도해 보세요");
    }
  }

  return (
    <StyledDiv>
      {showModal && (
        <Modal onModalCloseClick={handleModalCloseClick}>{modalMessage}</Modal>
      )}
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
        <ToiletPaperCheckContainer>
          <p>휴지가 있었나요? 있었다면 체크해주세요</p>
          <div
            className="check-image-container"
            onClick={handleToiletPaperCheckClick}
            role="button"
            onKeyDown={handleToiletPaperCheckClick}
            tabIndex={0}
          >
            <img
              src={
                enteredToiletPaper
                  ? toiletPaperCheckFull
                  : toiletPaperCheckEmpty
              }
              alt="toilet-paper-check"
            />
          </div>
        </ToiletPaperCheckContainer>
        <div className="image-upload-container">
          {uploadedImage && (
            <UploadedImageContainer>
              <img src={URL.createObjectURL(uploadedImage)} alt="uploaded" />
            </UploadedImageContainer>
          )}
          <div className="image-upload-button">
            <label htmlFor="photo-input">
              <img src={documentIcon} alt="upload-icon" />
              {uploadedImage && "이미지 다시 올리기"}
              {!uploadedImage && "이미지 업로드"}
            </label>
            <input
              type="file"
              id="photo-input"
              onChange={handleImageUpload}
              accept=".png,.jpg,.jpeg"
            />
          </div>
          <p>이미지는 1개만 업로드 할 수 있습니다.</p>
        </div>
        <textarea
          placeholder="이 화장실에 대한 리뷰를 남겨주세요."
          onChange={handleTextAreaInput}
        >
          {enteredText}
        </textarea>
        <ButtonFull icon={submitIcon} onClick={handleSubmitClick}>
          리뷰 남기기
        </ButtonFull>
      </StyledMain>
    </StyledDiv>
  );
}

ReviewEdit.propTypes = {
  toiletId: PropTypes.string.isRequired,
};

export default ReviewEdit;
