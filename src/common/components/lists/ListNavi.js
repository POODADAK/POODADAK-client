import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import right from "../../../assets/icon-right.png";
import { COLOR } from "../../util/constants";

const StyledListNavi = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;

  .description {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .label {
    font-size: medium;
    font-weight: 600;
    color: ${COLOR.HEAVY_GOLD};
    margin-left: 20px;
  }

  .secondary {
    font-size: medium;
    font-weight: 100;
    color: white;
    margin-right: 10px;
  }

  .btns {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
`;

function ListNavi({ label, secondary, onClick }) {
  return (
    <StyledListNavi onClick={onClick}>
      <div className="label">{label}</div>
      <div className="btns">
        <div className="secondary">{secondary}</div>
        <img src={right} alt="아이콘" />
      </div>
    </StyledListNavi>
  );
}

ListNavi.propTypes = {
  label: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ListNavi.defaultProps = {
  onClick: null,
};

export default ListNavi;
