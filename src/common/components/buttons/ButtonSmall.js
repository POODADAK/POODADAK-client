import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledButtonSmall = styled.button`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: small;
  color: ${COLOR.HEAVY_GOLD};
  background-color: ${COLOR.HEAVY_GREY};
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

ButtonSmall.defaultProps = {
  disabled: false,
  onClick: () => {},
};

ButtonSmall.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default ButtonSmall;
