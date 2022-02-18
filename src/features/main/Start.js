import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import startIcon from "../../assets/icon-start.svg";
import { COLOR } from "../../common/util/constants";

const StyledStart = styled.div`
  width: 100%;
  height: 100%;
  min-height: 568px;
  background-color: #0000008e;
  display: flex;
  justify-content: center;
  align-items: center;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .start-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .description {
    width: 100%;
    font-size: small;
    text-align: center;
    color: ${COLOR.HEAVY_GOLD};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .poodadak {
    font-size: large;
    font-weight: 600;
  }
`;

function Start({ onClick }) {
  return (
    <StyledStart>
      <div className="wrapper">
        <div
          className="start-button"
          role="button"
          tabIndex={0}
          onClick={() => {
            onClick();
          }}
          onKeyDown={() => {
            onClick();
          }}
        >
          <img src={startIcon} alt="시작" />
        </div>
        <div className="description">
          버튼을 누르면 공개 화장실을
          <div className="poodadak">푸다닥</div>
          찾습니다!
        </div>
      </div>
    </StyledStart>
  );
}

Start.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Start;
