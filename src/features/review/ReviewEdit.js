import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import submitIcon from "../../assets/icon-check-full.png";
import documentIcon from "../../assets/icon-docu-fluid.png";
import toiletPaperCheckEmpty from "../../assets/toilet-paper-check-empty.png";
import toiletPaperCheckFull from "../../assets/toilet-paper-check-full.png";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import ButtonFull from "../../common/components/buttons/ButtonFull";
import HeaderSub from "../../common/components/headers/HeaderSub";
import StarContainer from "../../common/components/starContainer/StarContainer";
import { COLOR } from "../../common/util/constants";
// import PhotoTest from "./PhotoTest";

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
  // const navigate = useNavigate();

  function starClickHandler(starNumber) {
    setEnteredRating(starNumber);
  }

  function handleToiletPaperCheckClick() {
    setEnteredToiletPaper((state) => !state);
  }

  function handleTextAreaInput(event) {
    setEnteredText(event.target.value);
  }

  async function handleSubmitClick() {
    await axios.post(
      "/review",
      {
        toilet: toiletId,
        rating: enteredRating,
        description: enteredText,
        didToiletPaperExist: enteredToiletPaper,
        updatedAt: new Date().toISOString(),
      },
      { withCredentials: true }
    );
  }

  return (
    <StyledDiv>
      <input type="file" name="myImage" />
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
          <ButtonFluid icon={documentIcon} color={COLOR.HEAVY_GOLD}>
            이미지 업로드
          </ButtonFluid>
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
