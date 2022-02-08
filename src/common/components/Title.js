import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  .title {
    font-size: x-large;
    font-weight: 600;
    color: #bc955c;
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Title;
