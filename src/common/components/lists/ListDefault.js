import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledListDefault = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: black;
  gap: 1rem;

  .label {
    font-size: large;
    font-weight: 600;
    color: #bc955c;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }

  .btns {
    margin-right: 20px;
  }
  .secondary {
    font-size: medium;
    color: white;
  }
`;

function ListDefault({ label, secondary }) {
  return (
    <StyledListDefault>
      <div className="label">{label}</div>
      <div className="secondary">{secondary}</div>
    </StyledListDefault>
  );
}

ListDefault.propTypes = {
  label: PropTypes.string.isRequired,
  secondary: PropTypes.string,
};

ListDefault.defaultProps = {
  secondary: null,
};

export default ListDefault;
