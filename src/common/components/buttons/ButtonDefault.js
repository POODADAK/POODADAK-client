import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import left from "../../../assets/icon-left.png";
import right from "../../../assets/icon-right.png";

const StyledButtonDefault = styled.button`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  color: #bc955c;
  background-color: black;
  padding: 10px 25px;
  border-radius: 3px;
`;

function ButtonDefault({ type, onClick, moveTo, disabled, children }) {
  return (
    <StyledButtonDefault
      type={type}
      onClick={onClick}
      moveTo={moveTo}
      disabled={disabled}
    >
      {moveTo === "left" && <img src={left} alt="뒤로가기" />}
      {children}
      {moveTo === "right" && <img src={right} alt="앞으로가기" />}
    </StyledButtonDefault>
  );
}

ButtonDefault.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  moveTo: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};

ButtonDefault.defaultProps = {
  moveTo: "none",
};

export default ButtonDefault;
