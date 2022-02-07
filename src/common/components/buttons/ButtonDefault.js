import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import left from "../../../assets/icon-left.png";
import right from "../../../assets/icon-right.png";

const StyledButtonDefault = styled.button`
  width: fit-content;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  color: #bc955c;
  background-color: black;
  padding: 10px;
  border-radius: 3px;
  .icon {
    margin-top: 2px;
    margin-right: 0.5rem;
  }
`;

function ButtonDefault({ type, onClick, moveTo, disabled, icon, children }) {
  return (
    <StyledButtonDefault
      type={type}
      onClick={onClick}
      moveTo={moveTo}
      disabled={disabled}
    >
      {moveTo === "left" && <img src={left} alt="뒤로가기" />}
      {icon && (
        <div className="icon">
          <img src={icon} alt="아이콘" />
        </div>
      )}
      {children && children}
      {moveTo === "right" && <img src={right} alt="앞으로가기" />}
    </StyledButtonDefault>
  );
}

ButtonDefault.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  moveTo: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  icon: PropTypes.element,
  children: PropTypes.string,
};

ButtonDefault.defaultProps = {
  moveTo: "none",
  icon: null,
  children: null,
};

export default ButtonDefault;
