import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { COLOR } from "../util/constants";

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;

  .title {
    font-size: x-large;
    font-weight: 600;
    color: ${COLOR.HEAVY_GOLD};
    margin: 15px 20px 5px 20px;
  }

  .description {
    font-size: medium;
    color: white;
    margin: 5px 20px 15px 20px;
  }
`;

function Title({ title, description }) {
  return (
    <StyledTitle>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </StyledTitle>
  );
}

Title.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Title.defaultProps = {
  title: "",
  description: "",
};

export default Title;
