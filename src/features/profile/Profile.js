/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import getUserReviewList from "../../common/api/getUserReviewList";
import HeaderSub from "../../common/components/headers/HeaderSub";
import ReviewCard from "../../common/components/reviewCard/ReviewCard";
import Title from "../../common/components/Title";

const StyledProfile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

function Profile() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [reviewList, setReviewList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

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
      {/* 등급표시 어떻게 할건지 파악 */}
      <Title
        title="리뷰"
        description={`총 ${reviewList.length}개의 리뷰가 있습니다.`}
      />
      {reviewList.map((review) => {
        // eslint-disable-next-line no-console
        console.log("12341234", review);
        return (
          <ReviewCard
            userId={userId}
            username={userInfo.username}
            level={userInfo.level}
            updatedAt={review.updatedAt}
            image={review.image}
            description={review.description}
            rating={review.rating}
            isMyReview={false}
            reviewId={review._id}
            key={review._id}
          />
        );
      })}
    </StyledProfile>
  );
}

export default Profile;
