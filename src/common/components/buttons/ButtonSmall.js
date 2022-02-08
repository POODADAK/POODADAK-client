import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledButtonSmall = styled.button`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: small;
  color: #bc955c;
  background-color: #4c4c4c;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
`;

function ButtonSmall({ type, onClick, disabled, children }) {
  return (
    <StyledButtonSmall type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButtonSmall>
  );
}

ButtonSmall.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};

export default ButtonSmall;
