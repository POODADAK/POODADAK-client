import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../../util/constants";

const StyledListCheck = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;

  .label {
    font-size: large;
    font-weight: 600;
    color: ${COLOR.HEAVY_GOLD};
    margin-left: 20px;
    display: flex;
    align-items: center;
  }

  .btns {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  .checkbox {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
  }
`;

function ListCheck({ label }) {
  return (
    <StyledListCheck>
      <div className="label">{label}</div>
      <div className="btns">
        <input className="checkbox" type="checkbox" />
      </div>
    </StyledListCheck>
  );
}

ListCheck.propTypes = {
  label: PropTypes.string.isRequired,
};

export default ListCheck;
