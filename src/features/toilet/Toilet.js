/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import docuIcon from "../../assets/icon-docu-fluid.png";
import helpIcon from "../../assets/icon-help-fluid.png";
import squaredSOS from "../../assets/icon-squaredsos.svg";
import viewFinder from "../../assets/icon-viewfinder.svg";
import waitIcon from "../../assets/icon-wait-fluid.png";
import getLiveChatByToilet from "../../common/api/getLiveChatByToilet";
import getToiletById from "../../common/api/getToiletById";
import ButtonDefault from "../../common/components/buttons/ButtonDefault";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import ButtonSmall from "../../common/components/buttons/ButtonSmall";
import HeaderSub from "../../common/components/headers/HeaderSub";
import ListDefault from "../../common/components/lists/ListDefault";
import Modal from "../../common/components/modal/Modal";
import ReviewCard from "../../common/components/reviewCard/ReviewCard";
import StarContainer from "../../common/components/starContainer/StarContainer";
import Title from "../../common/components/Title";
import mockLoadingToiletData from "../../common/util/mockLoadingToiletData";
import {
  chatStatusOptions,
  createdChatroom,
  errorChecked,
  userEnteredChatroom,
} from "../chat/chatSlice";

const StyledToilet = styled.div`
  width: 100%;
  flex-grow: 1;
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

  .fluidButtonWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px 0;
  }
`;

function Toilet() {
  const { toilet_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // eslint-disable-next-line no-unused-vars
  const chatStatus = useSelector((state) => state.chat.chatStatus);
  const nearToilets = useSelector((state) => state.toilet.nearToilets);
  const chatError = useSelector((state) => state.chat.error);

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showRescueButton, setShowRescueButton] = useState(false);
  const [toilet, setToilet] = useState(mockLoadingToiletData);

  const isChatroomDisconnected = chatStatus === chatStatusOptions.disconnected;
  const isChatroomConnected = chatStatus === chatStatusOptions.connected;
  const isChatroomError = chatStatus === chatStatusOptions.error;

  useEffect(() => {
    async function getReviews() {
      try {
        const toiletData = await getToiletById(toilet_id);

        setReviews(toiletData.reviewList);
        setToilet(toiletData);
      } catch (error) {
        setContentAndShowModal(
          <>
            <p>정보를 불러오지 못했습니다!</p>
            <p>{`${chatError.status} :  ${chatError.message}`}</p>
          </>
        );
      }
    }

    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function getAvgRating() {
      if (!reviews.length) {
        return 0;
      }

      let totalRating = 0;
      reviews.forEach((review) => {
        totalRating += review.rating;
      });
      return totalRating / reviews.length;
    }
    setAvgRating(getAvgRating());
  }, [reviews]);

  useEffect(() => {
    async function checkLiveChatAndSetRescueButton() {
      if (isLoggedIn) {
        const { liveChatroomList, myChatroom } = await getLiveChatByToilet(
          toilet_id
        );

        console.log(liveChatroomList);

        if (myChatroom) {
          dispatch(userEnteredChatroom(myChatroom));
        }

        if (liveChatroomList.length && !myChatroom && isChatroomDisconnected) {
          setShowRescueButton(true);
        }
      }
    }
    checkLiveChatAndSetRescueButton();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isChatroomError) {
      setContentAndShowModal(
        <>
          <p>채팅방 연결에 실패 했습니다!</p>
          <p>{`${chatError.status} :  ${chatError.message}`}</p>
        </>
      );
    }
  }, [isChatroomError]);

  async function onClickSOSButton() {
    if (!isLoggedIn) {
      // eslint-disable-next-line no-use-before-define
      setContentAndShowModal(
        <>
          <div>로그인이 필요합니다!</div>
          <ButtonSmall type="button" onClick={() => navigate("/")}>
            메인페이지로
          </ButtonSmall>
        </>
      );

      return;
    }

    if (isChatroomConnected) {
      setContentAndShowModal(
        <>
          <div>이미 참여중인 구조요청이 있습니다!</div>
          <ButtonSmall type="button" onClick={() => navigate("/")}>
            메인페이지로
          </ButtonSmall>
        </>
      );
    }

    let isNearToilet = false;

    for (let i = 0; i < nearToilets.length; i++) {
      if (nearToilets[i]._id === toilet._id) {
        isNearToilet = true;
        break;
      }
    }

    if (!isNearToilet) {
      setContentAndShowModal(<p>현재 위치가 해당 화장실 근처가 아닙니다!</p>);
      return;
    }

    dispatch(createdChatroom(toilet_id));
  }

  function handleWaitingSaviorClick() {
    navigate("/chatroom");
  }

  function handleRescueClick() {
    navigate("/chatroomList");
  }

  function onClickCreatReview() {
    navigate("/editReview/", { state: { toilet_id } });
  }

  function blablablabla() {} // TODO: 애매한 함수 처리를 위해 세팅해두었습니다. 해당 함수 적용은 정리 필요!!

  function handleModalCloseClick() {
    setModalContent("");
    setShowModal(false);
    dispatch(errorChecked());
  }

  function setContentAndShowModal(content) {
    setModalContent(content);
    setShowModal(true);
  }

  return (
    <StyledToilet>
      {showModal && (
        <Modal onModalCloseClick={handleModalCloseClick}>{modalContent}</Modal>
      )}
      <HeaderSub onClick={handleWaitingSaviorClick} />
      <div className="titleContainer">
        <Title title={toilet.toiletName} description={toilet.roadNameAddress} />
        {isChatroomDisconnected && (
          <ButtonDefault onClick={onClickSOSButton} icon={squaredSOS} />
        )}
        <ButtonDefault onClick={blablablabla} icon={viewFinder} />
      </div>
      <div className="fluidButtonWrapper">
        {isChatroomDisconnected && showRescueButton && (
          <ButtonFluid
            icon={helpIcon}
            color="#EB5757"
            onClick={handleRescueClick}
          >
            SOS 보낸사람 구조하기
          </ButtonFluid>
        )}
      </div>
      <div className="fluidButtonWrapper">
        {isChatroomConnected && (
          <ButtonFluid
            icon={waitIcon}
            color="#6FCF97"
            onClick={handleWaitingSaviorClick}
          >
            도와줄 사람 기다리기
          </ButtonFluid>
        )}
      </div>
      <div className="rankContainer">
        <div>청결도 평균 ( {avgRating} ) </div>
        <StarContainer rating={avgRating} showRatingNumber={false} />
      </div>
      <div className="toiletInfoContainer">
        <ListDefault label="개방시간" secondary={toilet.openTime} />
        <div className="toiletPaperContainer">
          <ListDefault
            label="휴지제공"
            secondary={toilet.latestToiletPaperInfo?.hasToiletPaper ? "O" : "X"}
          />
          <div className="lastToiletPaterProvideTime">
            마지막 확인 :{" "}
            {dayjs(toilet.latestToiletPaperInfo.lastDate).format("YYYY/MM/DD")}
          </div>
        </div>
        <ListDefault
          label="남녀공용"
          secondary={toilet.inUnisexToilet ? "O" : "X"}
        />
        <ListDefault
          label="대변기"
          secondary={`남 : ${toilet.menToiletBowlNumber}  /  여 : ${toilet.ladiesToiletBowlNumber}`}
        />
        <ListDefault
          label="장애인 대변기"
          secondary={`남 : ${toilet.menHandicapToiletBowlNumber}  /  여 : ${toilet.ladiesHandicapToiletBowlNumber}`}
        />
        <ListDefault
          label="아동용 대변기"
          secondary={`남아 : ${toilet.menChildrenToiletBowlNumber}  /  여아 : ${toilet.ladiesChildrenToiletBowlNumber}`}
        />
      </div>
      <Title
        title="리뷰"
        description={`총 ${reviews.length}개의 리뷰가 있습니다.`}
      />
      <div className="fluidButtonWrapper">
        <ButtonFluid
          icon={docuIcon}
          color="#bc955c"
          onClick={onClickCreatReview}
        >
          리뷰 남기기
        </ButtonFluid>
      </div>
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
          toilet={review.toilet}
          key={review._id}
        />
      ))}
    </StyledToilet>
  );
}

export default Toilet;
