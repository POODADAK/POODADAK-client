/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// import getReview from "../../common/api/getReview";

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
  // eslint-disable-next-line no-unused-vars
  const [reviewList, setReviewList] = useState([]);
  // const navigate = useNavigate();
  // console.log(userId);

  // useEffect(async () => {
  //   const response = await getReviewByUserID();
  // }, []);

  return (
    <StyledProfile>
      <HeaderSub />
      <Title title="유저네임" />
      {/* 등급표시 어떻게 할건지 파악 */}
      <Title
        title="리뷰"
        description={`총 ${`reviews.length`}개의 리뷰가 있습니다.`}
      />
      <ReviewCard />
      {/* 가져온 리뷰 뿌려주기 */}
    </StyledProfile>
  );
}

export default Profile;
