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
import { COLOR } from "../../common/util/constants";
import mockLoadingToiletData from "../../common/util/mockLoadingToiletData";
import {
  chatStatusOptions,
  createdChatroom,
  errorChecked,
  socketStatusOptions,
  userEnteredChatroom,
} from "../chat/chatSlice";
import { visitedToiletComponent } from "../login/loginSlice";

const StyledToilet = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;

  .titleContainer {
    padding: 0rem 1rem;
    display: flex;

    .buttonContainer {
      margin-top: 0.5rem;
      display: flex;
    }
  }

  .so-far {
    padding: 0rem 2.3rem;
    font-size: small;
    color: gray;
    margin-top: -0.8rem;
  }

  .rankContainer {
    font-size: large;
    font-weight: 400;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .toiletInfoContainer {
    padding: 1rem;
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

  .reviewContainer {
    padding: 1rem;
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
  const { toiletId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nearToilets = useSelector((state) => state.toilet.nearToilets);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const chatStatus = useSelector((state) => state.chat.chatStatus);
  const socketStatus = useSelector((state) => state.chat.socketStatus);
  const chatError = useSelector((state) => state.chat.error);
  const chatroomId = useSelector((state) => state.chat.chatroomId);

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showRescueButton, setShowRescueButton] = useState(false);
  const [toilet, setToilet] = useState(mockLoadingToiletData);
  const [isNear, setIsNear] = useState(false);

  const isChatroomDisconnected = chatStatus === chatStatusOptions.disconnected;
  const isChatroomConnected = chatStatus === chatStatusOptions.connected;
  const isChatroomError = chatStatus === chatStatusOptions.error;
  const isSocketConnected = socketStatus === socketStatusOptions.connected;

  const lastToiletPaperCheckDate =
    dayjs(toilet.latestToiletPaperInfo.lastDate).format("YYYY/MM/DD") ===
    "Invalid Date"
      ? "알 수 없음"
      : dayjs(toilet.latestToiletPaperInfo.lastDate).format("YYYY/MM/DD");

  useEffect(() => {
    async function getReviews() {
      try {
        const toiletData = await getToiletById(toiletId);

        setReviews(toiletData.reviewList);
        setToilet(toiletData);
      } catch (error) {
        setContentAndShowModal(
          <>
            <p>정보를 불러오지 못했습니다!</p>
            <p>{`${error.response.data.status} :  ${error.response.data.errMessage}`}</p>
          </>
        );
      }
    }

    getReviews();

    if (nearToilets) {
      for (const nearToilet of nearToilets) {
        if (nearToilet._id === toiletId) setIsNear(true);
      }
    }
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
      return (totalRating / reviews.length).toFixed(1);
    }
    setAvgRating(getAvgRating());
  }, [reviews]);

  useEffect(() => {
    async function checkLiveChatAndSetRescueButton() {
      if (isLoggedIn) {
        const { liveChatroomList, myChatroom } = await getLiveChatByToilet(
          toiletId
        );

        if (myChatroom) {
          dispatch(userEnteredChatroom(myChatroom));
        }

        if (liveChatroomList.length && !myChatroom && isChatroomDisconnected) {
          for (let i = 0; i < liveChatroomList.length; i++) {
            if (!liveChatroomList[i].participant) {
              setShowRescueButton(true);
              break;
            }
          }
        }
      }
    }
    checkLiveChatAndSetRescueButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatroomError]);

  useEffect(() => {
    dispatch(visitedToiletComponent(toiletId));
  });

  async function onClickSOSButton() {
    if (!isLoggedIn) {
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

    if (!isNear) {
      setContentAndShowModal(
        <>
          <div>
            정말 도움을 받고 싶으신가요? 아니어도 어쩔 수 없죠... 채팅은 해봐야
            하니까요.
          </div>
          <ButtonSmall
            type="button"
            onClick={() => {
              setShowModal(false);
              dispatch(createdChatroom(toiletId));
            }}
          >
            SOS 보내기
          </ButtonSmall>
        </>
      );

      return;
    }

    dispatch(createdChatroom(toiletId));
  }

  function handleWaitingSaviorClick() {
    navigate(`/chatroomList/${chatroomId}`);
  }

  function handleRescueClick() {
    navigate("/chatroomList", {
      state: { toiletId, toiletName: toilet.toiletName },
    });
  }

  function onClickCreatReview() {
    navigate("/editReview", { state: { toilet } });
  }

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
      <HeaderSub isGoBackButtonMain={true} />
      <div className="titleContainer">
        <Title title={toilet.toiletName} description={toilet.roadNameAddress} />
        <div className="buttonContainer">
          {isChatroomDisconnected && (
            <ButtonDefault onClick={onClickSOSButton} icon={squaredSOS} />
          )}
          <ButtonDefault icon={viewFinder} />
        </div>
      </div>
      {!isNear && (
        <div className="so-far">
          헉! 500m 이상 멀어요... 거기까진... 안되요 ㅠ
        </div>
      )}
      <div className="fluidButtonWrapper">
        {isChatroomDisconnected && showRescueButton && (
          <ButtonFluid
            icon={helpIcon}
            color={COLOR.SALMON_PINK}
            onClick={handleRescueClick}
          >
            SOS 보낸사람 구조하기
          </ButtonFluid>
        )}
      </div>
      <div className="fluidButtonWrapper">
        {isChatroomConnected && !isSocketConnected && (
          <ButtonFluid
            icon={waitIcon}
            color={COLOR.CYAN}
            onClick={handleWaitingSaviorClick}
          >
            도와줄 사람 기다리기
          </ButtonFluid>
        )}
      </div>
      <div className="rankContainer">
        <div>청결도 평균 ( {avgRating} ) </div>
        <div>
          <StarContainer
            className="star"
            rating={avgRating}
            showRatingNumber={false}
          />
        </div>
      </div>
      <div className="toiletInfoContainer">
        <ListDefault label="개방시간" secondary={toilet.openTime} />
        <div className="toiletPaperContainer">
          <ListDefault
            label="휴지제공"
            secondary={toilet.latestToiletPaperInfo?.hasToiletPaper ? "O" : "X"}
          />
          <div className="lastToiletPaterProvideTime">
            마지막 확인 : {lastToiletPaperCheckDate}
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
      <div className="reviewContainer">
        <Title
          title="리뷰"
          description={`총 ${reviews.length}개의 리뷰가 있습니다.`}
        />
        <div className="fluidButtonWrapper">
          <ButtonFluid
            icon={docuIcon}
            color={COLOR.HEAVY_GOLD}
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
      </div>
    </StyledToilet>
  );
}

export default Toilet;
