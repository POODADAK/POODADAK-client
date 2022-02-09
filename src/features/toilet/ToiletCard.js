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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background-color: black;

  .distance {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.3rem;

    .toilet-distance {
      margin-left: 3rem;
      padding: 0.3rem 0.8rem;
      border-radius: 0.3rem;
      background-color: #c0c0c0;
      color: black;
    }
  }

  .name {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    margin-left: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;

    .toilet-name {
      margin-left: 0.5rem;
    }
  }

  .toilet-info {
    width: 100%;
    margin-left: 6rem;
    margin-bottom: 0.5rem;
    color: gray;
  }
`;

function ToiletCard({
  showToiletPath,
  toiletID,
  distance,
  isSOS,
  toiletName,
  roadNameAddress,
  menToiletBowlNumber,
  ladiesToiletBowlNumber,
}) {
  const navigate = useNavigate();

  function moveToiletDetail(e) {
    e.stopPropagation();
    navigate(`/toilets/${toiletID}`);
  }

  return (
    <StyledToiletCard onClick={showToiletPath}>
      <div className="distance">
        <div className="toilet-distance">{distance} m</div>
        <ButtonDefault moveTo="right" onClick={(e) => moveToiletDetail(e)}>
          상세정보
        </ButtonDefault>
      </div>
      <div className="name">
        {isSOS ? <img src={sosPin} alt="핀" /> : <img src={pin} alt="핀" />}
        <div className="toilet-name">{toiletName}</div>
      </div>
      <div className="toilet-info">{roadNameAddress}</div>
      <div className="toilet-info">
        남자화장실 대변기 수 : {menToiletBowlNumber}
      </div>
      <div className="toilet-info">
        여자화장실 대변기 수 : {ladiesToiletBowlNumber}
      </div>
    </StyledToiletCard>
  );
}

ToiletCard.propTypes = {
  showToiletPath: PropTypes.func.isRequired,
  toiletID: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  isSOS: PropTypes.bool.isRequired,
  toiletName: PropTypes.string.isRequired,
  roadNameAddress: PropTypes.string.isRequired,
  menToiletBowlNumber: PropTypes.number.isRequired,
  ladiesToiletBowlNumber: PropTypes.number.isRequired,
};

export default ToiletCard;
