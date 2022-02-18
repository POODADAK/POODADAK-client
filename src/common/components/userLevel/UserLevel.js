import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import bronze from "../../../assets/icon-rank-bronze.png";
import gold from "../../../assets/icon-rank-gold.png";
import silver from "../../../assets/icon-rank-silver.png";
import { USER_LEVEL, COLOR } from "../../util/constants";

const UserLevelContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;

  .rankIcon {
    margin-left: 2rem;

    img {
      width: 70%;
    }
  }

  .descriptionContainer {
    width: 50%;
    margin-right: 3rem;
  }

  .rank {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .email {
    color: ${COLOR.LIGHTER_GREY};
  }

  .description {
    font-size: 0.75rem;
    font-weight: 100;
  }
`;

function UserLevel({ level, isMyReview, email }) {
  let userRankImageSrc = bronze;
  let description = "아직 부족한 휴지끈... 분발하세요";

  if (level === USER_LEVEL.GOLD) {
    userRankImageSrc = gold;
    description = "🧻  프리미엄 휴지끈 보유자! 👍 ";
  }

  if (level === USER_LEVEL.SILVER) {
    userRankImageSrc = silver;
    description = "🧻  당신의 훌륭한 휴지끈 길이!";
  }

  if (level === USER_LEVEL.BRONZE) {
    userRankImageSrc = bronze;
    description = "🧻  아직 부족한 휴지끈... 분발하세요";
  }

  return (
    <UserLevelContainer>
      <div className="rankIcon">
        <img src={userRankImageSrc} alt="rankIcon" />
      </div>
      <div className="descriptionContainer">
        <div className="rank">등급 : {level}</div>
        {isMyReview && <div className="email">{email}</div>}
        <br />
        <div className="description">{description}</div>
      </div>
    </UserLevelContainer>
  );
}

UserLevel.propTypes = {
  level: PropTypes.string,
  isMyReview: PropTypes.bool,
  email: PropTypes.string,
};
UserLevel.defaultProps = {
  level: USER_LEVEL.BRONZE,
  isMyReview: false,
  email: "",
};

export default UserLevel;
