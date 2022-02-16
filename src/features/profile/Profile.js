/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import getUserReviewList from "../../common/api/getUserReviewList";
import HeaderSub from "../../common/components/headers/HeaderSub";
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
  const loggedInUserId = useSelector((state) => state.login.userId);

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === loggedInUserId) {
      setIsMyReview(true);
    } else {
      setIsMyReview(false);
    }
  }, []);

  useEffect(() => {
    (async function getReviewLit() {
      const response = await getUserReviewList(userId);
      setUserInfo(response);
      setReviewList(response.reviewList);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledProfile>
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
