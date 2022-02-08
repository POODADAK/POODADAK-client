import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledButtonFluid = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: large;
  color: white;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  cursor: pointer;
  .icon {
    margin-right: 0.5rem;
  }
`;

function ButtonFluid({ type, onClick, icon, color, disabled, children }) {
  return (
    <StyledButtonFluid
      type={type}
      onClick={onClick}
      color={color}
      disabled={disabled}
    >
      {icon && (
        <div className="icon">
          <img src={icon} alt="아이콘" />
        </div>
      )}
      {children}
    </StyledButtonFluid>
  );
}

ButtonFluid.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  color: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};

ButtonFluid.defaultProps = {
  icon: null,
  color: "gray",
};

export default ButtonFluid;
