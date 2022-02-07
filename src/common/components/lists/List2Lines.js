import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import right from "../../../assets/icon-right.png";

const StyledList2Lines = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  .description {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .label {
    font-size: medium;
    font-weight: 600;
    color: #bc955c;
    margin-bottom: -8px;
  }
  .secondary {
    font-size: medium;
    font-weight: 100;
    color: white;
  }
  .btns {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
`;

function List2Lines({ label, secondary, onClick }) {
  return (
    <StyledList2Lines onClick={onClick}>
      <div className="description">
        <div className="label">{label}</div>
        <div className="secondary">{secondary}</div>
      </div>
      <div className="btns">
        <img src={right} alt="아이콘" />
      </div>
    </StyledList2Lines>
  );
}

List2Lines.propTypes = {
  label: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

List2Lines.defaultProps = {
  onClick: null,
};

export default List2Lines;
