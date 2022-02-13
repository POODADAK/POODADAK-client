/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import axios from "axios";
import haversine from "haversine-distance";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import docuIcon from "../../assets/icon-docu-fluid.png";
import helpIcon from "../../assets/icon-help-fluid.png";
import squaredSOS from "../../assets/icon-squaredsos.svg";
import viewFinder from "../../assets/icon-viewfinder.svg";
import waitIcon from "../../assets/icon-wait-fluid.png";
import connectSocketNamespace from "../../common/api/connectSocketNamespace";
import getLiveChatByToilet from "../../common/api/getLiveChatByToilet";
import getMyLongLat from "../../common/api/getMyLongLat";
import ButtonDefault from "../../common/components/buttons/ButtonDefault";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import ButtonSmall from "../../common/components/buttons/ButtonSmall";
import HeaderSub from "../../common/components/headers/HeaderSub";
import ListDefault from "../../common/components/lists/ListDefault";
import Modal from "../../common/components/modal/Modal";
import ReviewCard from "../../common/components/reviewCard/ReviewCard";
import StarContainer from "../../common/components/starContainer/StarContainer";
import Title from "../../common/components/Title";
import {
  userCreatedChat,
  userClosedChat,
  disconnectExistingSocket,
} from "../chat/chatSlice";

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

const SOS_AVAILABLE_METER = 500;

function Toilet() {
  const { toilet_id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const dispatch = useDispatch();

  // const {
  //   showToiletPath,
  //   toiletName,
  //   roadNameAddress,
  //   inUnisexToilet,
  //   menToiletBowlNumber,
  //   menHandicapToiletBowlNumber,
  //   menChildrenToiletBowlNumber,
  //   ladiesToiletBowlNumber,
  //   ladiesHandicapToiletBowlNumber,
  //   ladiesChildrenToiletBowlNumber,
  //   openTime,
  //   latestToiletPaperInfo,
  //   location: DBlocation,
  // } = location.state.toilet;

  // console.log("커밋하기전에 아래거 지울것.");
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
    location: DBlocation,
  } = {
    showToiletPath: () => {},
    toiletName: "삼성",
    roadNameAddress: "삼성",
    inUnisexToilet: true,
    menToiletBowlNumber: 1,
    menHandicapToiletBowlNumber: 1,
    menChildrenToiletBowlNumber: 1,
    ladiesToiletBowlNumber: 1,
    ladiesHandicapToiletBowlNumber: 1,
    ladiesChildrenToiletBowlNumber: 1,
    openTime: "33",
    latestToiletPaperInfo: {
      lastDate: new Date().toISOString(),
      isToiletPaper: true,
    },
    chatRoomList: [],
    location: {
      coordinates: [127.063067, 37.508826],
    },
  };

  const [toiletLongitude, toiletLatitude] = DBlocation.coordinates;
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const currentSocket = useSelector((state) => state.chat.currentSocket);

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [showRescueButton, setShowRescueButton] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        const { data } = await axios.get(`/toilets/review/${toilet_id}`);
        setReviews(data.reviewList);
      } catch (error) {
        // 추후 에러처리 필요.
        // eslint-disable-next-line no-console
        console.log(error);
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
        const { liveChatList, isMyChat } = await getLiveChatByToilet(toilet_id);

        if (isMyChat) {
          const socket = connectSocketNamespace("toiletId", toilet_id);

          socket.on("connect", () => {
            dispatch(disconnectExistingSocket);
            dispatch(userCreatedChat(socket));
          });

          socket.on("disconnect", () => {
            // eslint-disable-next-line no-console
            console.log("Socket disconnected!");
            dispatch(userClosedChat());
          });
        }

        if (liveChatList.length && !isMyChat) {
          setShowRescueButton(true);
        }
      }
    }

    checkLiveChatAndSetRescueButton();
  }, [isLoggedIn, toilet_id]);

  useEffect(() => () => {
    if (currentSocket) {
      currentSocket.off("db-error");
    }
  });

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

    if (currentSocket) {
      // eslint-disable-next-line no-use-before-define
      setContentAndShowModal(
        <>
          <div>이미 구조요청을 보냈습니다!</div>
          <ButtonSmall type="button" onClick={() => navigate("/")}>
            메인페이지로
          </ButtonSmall>
        </>
      );
    }

    try {
      const { longitude, latitude } = await getMyLongLat();
      const isDistanceWithin500m =
        haversine(
          { longitude, latitude },
          { longitude: toiletLongitude, latitude: toiletLatitude }
        ) <= SOS_AVAILABLE_METER;

      if (!isDistanceWithin500m) {
        // eslint-disable-next-line no-use-before-define
        setContentAndShowModal(<p>현재 위치가 해당 화장실 근처가 아닙니다!</p>);

        return;
      }

      const socket = connectSocketNamespace("toiletId", toilet_id);

      socket.on("createChatroom", (chatroomId) => {
        dispatch(disconnectExistingSocket);
        dispatch(userCreatedChat({ socket, chatroomId }));
      });

      socket.on("db-error", (error) => {
        dispatch(userClosedChat());
        // eslint-disable-next-line no-use-before-define
        setContentAndShowModal(
          <>
            <p>현재 연결 할 수 없습니다!</p>
            <p>{`${error.status} :  ${error.message}`}</p>
          </>
        );
      });

      socket.on("disconnect", () => {
        // eslint-disable-next-line no-console
        console.log("Socket disconnected!");
        dispatch(userClosedChat());
      });
    } catch (error) {
      // 추후 에러처리 필요.
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  function handleWaitingSaviorClick() {
    navigate("/chatroom");
  }

  function handleRescueClick() {
    navigate("/chatList");
  }

  function onClickCreatReview() {
    navigate("/editReview/", { toilet_id });
  }

  function handleModalCloseClick() {
    setModalContent("");
    setShowModal(false);
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
        <Title title={toiletName} description={roadNameAddress} />

        {!currentSocket && (
          <ButtonDefault onClick={onClickSOSButton} icon={squaredSOS} />
        )}

        <ButtonDefault onClick={showToiletPath} icon={viewFinder} />
      </div>

      {!currentSocket && showRescueButton && (
        <ButtonFluid
          icon={helpIcon}
          color="#EB5757"
          onClick={handleRescueClick}
        >
          SOS 보낸사람 구조하기
        </ButtonFluid>
      )}

      {currentSocket && (
        <ButtonFluid
          icon={waitIcon}
          color="#6FCF97"
          onClick={handleWaitingSaviorClick}
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
