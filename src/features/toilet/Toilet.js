/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import docuIcon from "../../assets/icon-docu-fluid.png";
import helpIcon from "../../assets/icon-help-fluid.png";
import squaredSOS from "../../assets/icon-squaredsos.svg";
import viewFinder from "../../assets/icon-viewfinder.svg";
import waitIcon from "../../assets/icon-wait-fluid.png";
import ButtonDefault from "../../common/components/buttons/ButtonDefault";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import HeaderSub from "../../common/components/headers/HeaderSub";
import ListDefault from "../../common/components/lists/ListDefault";
import ReviewCard from "../../common/components/reviewCard/ReviewCard";
import StarContainer from "../../common/components/starContainer/StarContainer";
import Title from "../../common/components/Title";
import { updateToiletInfo } from "./toiletSlice";

const StyledToilet = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;

  .titleContainer {
    display: flex;
    align-items: center;
  }

  .rankContainer {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .toiletPaperContainer {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .lastToiletPaterProvideTime {
    width: 100%;
    font-size: small;
    color: gray;
    margin-right: 1rem;
  }
`;

function Toilet() {
  const { toilet_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    showToiletPath,
    toiletName,
    roadNameAddress,
    inUnisexToilet,
    menToiletBowlNumber,
    menHandicapToiletBowlNumber,
    menChildrenToiletBowlNumber,
    ladiesToiletBowlNumber,
    ladiesHandicapToiletBowlNumber,
    ladiesChildrenToiletBowlNumber,
    openTime,
    latestToiletPaperInfo,
    isSOS,
    chatRoomList,
  } = location.state;

  const userClickedSOSButton = useSelector(
    (state) => state.currnetToiletInfo.byIds[toilet_id]?.userClickedSOSButton
  );
  const isSOSCurrnetToilet = useSelector(
    (state) => state.currnetToiletInfo.byIds[toilet_id]?.isSOSCurrnetToilet
  );

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [userSOSButton, setUserSOSButton] = useState(userClickedSOSButton);

  useEffect(() => {
    dispatch(updateToiletInfo({ toilet_id, isSOS, userSOSButton }));
  }, [userSOSButton]);

  useEffect(() => {
    async function getReviews() {
      try {
        const { data } = await axios.get(`/toilets/review/${toilet_id}`);
        setReviews(data.reviewList);
      } catch (error) {
        // 추후 에러처리 필요.
        console.log(error);
      }
    }

    getReviews();
  }, []);

  useEffect(() => {
    function getAvgRating() {
      if (!reviews.length) {
        return 0;
      }

      let totalRating = 0;
      // eslint-disable-next-line no-return-assign
      reviews.forEach((review) => (totalRating += review.rating));
      return totalRating / reviews.length;
    }
    setAvgRating(getAvgRating());
  }, [reviews]);

  function onClickSOSButton() {
    setUserSOSButton(true);

    async function occurSOS() {
      try {
        await axios.post("/toilets/occurSOS", {
          toilet_id,
          SOSState: true,
        });
      } catch (error) {
        // 추후 에러처리 필요.
        console.log(error);
      }
    }
    occurSOS();
  }

  function onClickWaitingSavior() {
    navigate("/chats", { toilet_id, chatRoomList });
  }

  function onClickCreatReview() {
    navigate("/editReview/", { toilet_id });
  }

  return (
    <StyledToilet>
      <HeaderSub onClick={onClickWaitingSavior} />

      <div className="titleContainer">
        <Title title={toiletName} description={roadNameAddress} />

        {!userClickedSOSButton && (
          <ButtonDefault onClick={onClickSOSButton} icon={squaredSOS} />
        )}

        <ButtonDefault onClick={showToiletPath} icon={viewFinder} />
      </div>

      {isSOSCurrnetToilet && (
        <ButtonFluid
          icon={helpIcon}
          color="#EB5757"
          onClick={onClickWaitingSavior}
        >
          SOS 보낸사람 구조하기
        </ButtonFluid>
      )}

      {userClickedSOSButton && (
        <ButtonFluid
          icon={waitIcon}
          color="#6FCF97"
          onClick={onClickWaitingSavior}
        >
          도와줄 사람 기다리기
        </ButtonFluid>
      )}

      <div className="rankContainer">
        <div>청결도 평균 ( {avgRating} ) </div>
        <StarContainer rating={avgRating} showRatingNumber={false} />
      </div>

      <div className="toiletInfoContainer">
        <ListDefault label="개방시간" secondary={openTime} />

        <div className="toiletPaperContainer">
          <ListDefault
            label="휴지제공"
            secondary={latestToiletPaperInfo.isToiletPaper ? "O" : "X"}
          />
          <div className="lastToiletPaterProvideTime">
            마지막 확인 : {latestToiletPaperInfo.lastDate}
          </div>
        </div>

        <ListDefault label="남녀공용" secondary={inUnisexToilet ? "O" : "X"} />
        <ListDefault
          label="대변기"
          secondary={`남 : ${menToiletBowlNumber}  /  여 : ${ladiesToiletBowlNumber}`}
        />
        <ListDefault
          label="장애인 대변기"
          secondary={`남 : ${menHandicapToiletBowlNumber}  /  여 : ${ladiesHandicapToiletBowlNumber}`}
        />
        <ListDefault
          label="아동용 대변기"
          secondary={`남아 : ${menChildrenToiletBowlNumber}  /  여아 : ${ladiesChildrenToiletBowlNumber}`}
        />
      </div>

      <Title
        title="리뷰"
        description={`총 ${reviews.length}개의 리뷰가 있습니다.`}
      />

      <ButtonFluid icon={docuIcon} color="#bc955c" onClick={onClickCreatReview}>
        리뷰 남기기
      </ButtonFluid>

      {reviews.map((review) => (
        <ReviewCard
          userId={review.writer._id}
          username={review.writer.username}
          level={review.writer.level}
          updatedAt={review.updatedAt}
          image={review.image}
          description={review.description}
          rating={review.rating}
          isMyReview={false}
          reviewId={review._id}
          key={review._id}
        />
      ))}
    </StyledToilet>
  );
}

export default Toilet;
