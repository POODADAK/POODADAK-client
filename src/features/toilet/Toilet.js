import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import squaredSOS from "../../assets/icon-squaredsos.svg";
import viewFinder from "../../assets/icon-viewfinder.svg";
import ButtonDefault from "../../common/components/buttons/ButtonDefault";
import HeaderSub from "../../common/components/headers/HeaderSub";
import ListDefault from "../../common/components/lists/ListDefault";
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
    display: flex;
    align-items: center;
    margin-right: 150px;
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
  IsSOS,
}) {
  const rating = 3;
  const showRatingNumber = false;
  const unisexToilet = inUnisexToilet ? "O" : "X";
  const provideToiletPaper = latestToiletPaperInfo.isToiletPaper ? "O" : "X";
  // const lastCheckToiletPaperTime = latestToiletPaperInfo.lastDate;
  const lastCheckToiletPaperTime = 1234;
  // eslint-disable-next-line camelcase
  const { toilet_id } = useParams();

  const [reviews, setReviews] = useState([]);
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
        <div>청결도 평균 ({avgRating})</div>
        <StarContainer rating={rating} showRatingNumber={showRatingNumber} />
      </div>

      <div className="toiletInfoContainer">
        <ListDefault label="개방시간" secondary={openTime} />

        <div className="toiletPaperContainer">
          <ListDefault label="휴지제공" secondary={provideToiletPaper} />
          <div>{lastCheckToiletPaperTime}</div>
        </div>

        <ListDefault label="남녀공용" secondary={unisexToilet} />

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
  IsSOS: PropTypes.bool.isRequired,
};

Toilet.defaultProps = {
  latestToiletPaperInfo: {
    lastDate: "x",
    isToiletPaper: false,
  },
};

export default Toilet;
