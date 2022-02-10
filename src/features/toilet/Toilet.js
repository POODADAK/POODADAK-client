import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import helpIcon from "../../assets/icon-docu-fluid.png";
import squaredSOS from "../../assets/icon-squaredsos.svg";
import viewFinder from "../../assets/icon-viewfinder.svg";
import ButtonDefault from "../../common/components/buttons/ButtonDefault";
import ButtonFluid from "../../common/components/buttons/ButtonFluid";
import HeaderSub from "../../common/components/headers/HeaderSub";
import ListDefault from "../../common/components/lists/ListDefault";
import ReviewCard from "../../common/components/reviewCard/ReviewCard";
import StarContainer from "../../common/components/starContainer/StarContainer";
import Title from "../../common/components/Title";

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
    width: 30%;
    font-size: small;
    color: white;
    margin-right: 5rem;
  }
`;

function Toilet({
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
  // eslint-disable-next-line no-unused-vars
  isSOS,
}) {
  // eslint-disable-next-line camelcase
  const { toilet_id } = useParams();

  // 테스트를 위해 초기값 임의적용
  const [reviews, setReviews] = useState([{}]);
  const [avgRating, setAvgRating] = useState(0);
  // const navigate = useNavigate();

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

  useEffect(() => {
    async function getReviews() {
      // eslint-disable-next-line camelcase
      const { data } = await axios.get(`/toilets//review/${toilet_id}`);
      setReviews(data.reviewList);
      // console.log(data.reviewList);
    }
    getReviews();
  }, []);

  return (
    <StyledToilet>
      <HeaderSub />
      <div className="titleContainer">
        <Title title={toiletName} description={roadNameAddress} />
        <ButtonDefault onClick={() => {}} icon={squaredSOS} />
        <ButtonDefault onClick={() => {}} icon={viewFinder} />
      </div>

      <div className="rankContainer">
        <div>청결도 평균 ( {avgRating} ) </div>
        <StarContainer rating={avgRating} showRatingNumber />
      </div>

      <div className="toiletInfoContainer">
        <ListDefault label="개방시간" secondary={openTime} />

        <div className="toiletPaperContainer">
          <ListDefault
            label="휴지제공"
            secondary={latestToiletPaperInfo.isToiletPaper ? "O" : "X"}
          />
          <div className="lastToiletPaterProvideTime">
            마지막 확인 :{" "}
            {latestToiletPaperInfo.isToiletPaper
              ? latestToiletPaperInfo.lastDate
              : "X"}
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
      <ButtonFluid icon={helpIcon} color="#bc955c">
        리뷰 남기기
      </ButtonFluid>
      <ReviewCard />
      {/* {reviews.map((review) => {
        // console.log(review);
        <ReviewCard
        // userId={review.writer}
        // username={}
        // level={}
        // updatedAt={}
        // image={}
        // description={}
        // rating={}
        // isMyReview={}
        // reviewId={}
        />;
      })} */}
    </StyledToilet>
  );
}

Toilet.propTypes = {
  toiletName: PropTypes.string.isRequired,
  roadNameAddress: PropTypes.string.isRequired,
  inUnisexToilet: PropTypes.bool.isRequired,
  menToiletBowlNumber: PropTypes.number.isRequired,
  menHandicapToiletBowlNumber: PropTypes.number.isRequired,
  menChildrenToiletBowlNumber: PropTypes.number.isRequired,
  ladiesToiletBowlNumber: PropTypes.number.isRequired,
  ladiesHandicapToiletBowlNumber: PropTypes.number.isRequired,
  ladiesChildrenToiletBowlNumber: PropTypes.number.isRequired,
  openTime: PropTypes.string.isRequired,
  latestToiletPaperInfo: PropTypes.shape({
    lastDate: PropTypes.string,
    isToiletPaper: PropTypes.bool,
  }),
  isSOS: PropTypes.bool.isRequired,
};

Toilet.defaultProps = {
  // test 용
  // toiletName: "홍우빌딩",
  // roadNameAddress: "테헤란로 522",
  // inUnisexToilet: false,
  // menToiletBowlNumber: 2,
  // menHandicapToiletBowlNumber: 0,
  // menChildrenToiletBowlNumber: 0,
  // ladiesToiletBowlNumber: 2,
  // ladiesHandicapToiletBowlNumber: 2,
  // ladiesChildrenToiletBowlNumber: 1,
  // openTime: "05:00 ~ 01:00",
  // latestToiletPaperInfo: {
  //   lastDate: "어제",
  //   isToiletPaper: true,
  // },
  // isSOS: false,

  //
  latestToiletPaperInfo: {
    lastDate: "9999.99.99",
    isToiletPaper: true,
  },
};

export default Toilet;
