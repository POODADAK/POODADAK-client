import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import getUserReviewList from "../../common/api/getUserReviewList";
import HeaderSub from "../../common/components/headers/HeaderSub";
import Modal from "../../common/components/modal/Modal";
import ReviewCard from "../../common/components/reviewCard/ReviewCard";
import Title from "../../common/components/Title";
import UserLevel from "../../common/components/userLevel/UserLevel";

const StyledProfile = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function Profile() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [isMyReview, setIsMyReview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const loggedInUserId = useSelector((state) => state.login.userId);

  useEffect(() => {
    if (userId === loggedInUserId) {
      setIsMyReview(true);
    } else {
      setIsMyReview(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      (async function getReviewLit() {
        const response = await getUserReviewList(userId);
        setUserInfo(response);
        setReviewList(response.reviewList);
      })();
    } catch (error) {
      setContentAndShowModal(
        <>
          <div>리뷰를 가져오지 못했습니다...</div>
          <p>{`에러: ${error.response.data.errMessage}`}</p>
        </>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleModalCloseClick() {
    setModalContent("");
    setShowModal(false);
  }

  function setContentAndShowModal(content) {
    setModalContent(content);
    setShowModal(true);
  }

  return (
    <StyledProfile>
      {showModal && (
        <Modal onModalCloseClick={handleModalCloseClick}>{modalContent}</Modal>
      )}
      <HeaderSub />
      <Title title={userInfo.username} />
      <UserLevel level={userInfo.level} />
      <Title
        title="리뷰"
        description={`총 ${reviewList.length}개의 리뷰가 있습니다.`}
      />
      {reviewList.map((review) => (
        <ReviewCard
          userId={userId}
          username={userInfo.username}
          level={userInfo.level}
          updatedAt={review.updatedAt}
          image={review.image}
          description={review.description}
          rating={review.rating}
          isMyReview={isMyReview}
          toilet={review.toilet}
          reviewId={review._id}
          key={review._id}
        />
      ))}
    </StyledProfile>
  );
}

export default Profile;
