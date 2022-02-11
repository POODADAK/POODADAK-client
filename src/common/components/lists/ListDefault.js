import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import right from "../../../assets/icon-right.png";

const StyledListDefault = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;

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
    display: flex;
    align-items: center;
  }
`;

function ListDefault({ label, onClick }) {
  return (
    <StyledListDefault onClick={onClick}>
      <div className="label">{label}</div>
      <div className="btns">
        <img src={right} alt="아이콘" />
      </div>
    </StyledListDefault>
  );
}

ListDefault.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ListDefault.defaultProps = {
  onClick: null,
};

export default ListDefault;
