import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import left from "../../../assets/icon-left.png";
import right from "../../../assets/icon-right.png";

const StyledButtonDefault = styled.div`
  width: fit-content;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  color: #bc955c;
  background-color: black;
  border-radius: 3px;
  padding: 4px 10px;
  cursor: pointer;
  .button {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function ButtonDefault({ onClick, moveTo, icon, children }) {
  function handleKeyDown() {}

  return (
    <StyledButtonDefault>
      <div
        className="button"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        moveTo={moveTo}
      >
        {moveTo === "left" && <img src={left} alt="뒤로가기" />}
        {icon && (
          <div className="icon">
            <img src={icon} alt="아이콘" />
          </div>
        )}
        {children && children}
        {moveTo === "right" && <img src={right} alt="앞으로가기" />}
      </div>
    </StyledButtonDefault>
  );
}

ButtonDefault.propTypes = {
  onClick: PropTypes.func.isRequired,
  moveTo: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.string,
};

ButtonDefault.defaultProps = {
  moveTo: "none",
  icon: null,
  children: null,
};

export default ButtonDefault;
