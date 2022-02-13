import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import sosPin from "../../assets/icon-pin-sos.svg";
import pin from "../../assets/icon-pin.svg";
import ButtonDefault from "../../common/components/buttons/ButtonDefault";

const StyledToiletCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .wrapper {
    width: 80%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.7rem;
    background-color: black;
    gap: 10px;
    padding: 0.5rem 1rem 1rem 1rem;
  }
  .header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .distance {
      padding: 0.3rem 0.8rem;
      margin-left: 11%;
      margin-bottom: -0.5rem;
      border-radius: 0.3rem;
      background-color: #c0c0c0;
      font-size: small;
      color: black;
    }
  }
  .name {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: large;
    font-weight: 600;
    color: white;
    gap: 10px;
    margin-bottom: -0.3rem;
    .toilet-pin {
      width: 30px;
      height: 30px;
    }
  }
  .toilet-info {
    width: 100%;
    margin-left: 80px;
    font-size: small;
    color: gray;
    display: flex;
    flex-direction: column;
  }
`;

function ToiletCard({ toilet, distance, time }) {
  const navigate = useNavigate();
  const {
    _id: toiletId,
    isSOS,
    toiletName,
    roadNameAddress,
    menToiletBowlNumber,
    ladiesToiletBowlNumber,
  } = toilet;

  function moveToiletDetail(e) {
    e.stopPropagation();
    navigate(`/toilets/${toiletId}`, {
      state: toilet,
    });
  }

  return (
    <StyledToiletCard>
      <div className="wrapper">
        <div className="header">
          <div className="distance">
            {distance}m (도보 {time}분)
          </div>
          <ButtonDefault moveTo="right" onClick={(e) => moveToiletDetail(e)}>
            상세정보
          </ButtonDefault>
        </div>
        <div className="name">
          <div className="toilet-pin">
            {isSOS ? <img src={sosPin} alt="핀" /> : <img src={pin} alt="핀" />}
          </div>
          <div className="toilet-name">{toiletName}</div>
        </div>
        <div className="toilet-info">
          <div>{roadNameAddress}</div>
          <div>남자화장실 대변기 수 : {menToiletBowlNumber}</div>
          <div>여자화장실 대변기 수 : {ladiesToiletBowlNumber}</div>
        </div>
      </div>
    </StyledToiletCard>
  );
}

ToiletCard.propTypes = {
  toilet: PropTypes.shape({
    _id: PropTypes.string,
    isSOS: PropTypes.bool,
    toiletName: PropTypes.string,
    roadNameAddress: PropTypes.string,
    menToiletBowlNumber: PropTypes.number,
    ladiesToiletBowlNumber: PropTypes.number,
  }).isRequired,
  distance: PropTypes.number,
  time: PropTypes.number,
};

ToiletCard.defaultProps = {
  distance: 0,
  time: 0,
};

export default ToiletCard;
