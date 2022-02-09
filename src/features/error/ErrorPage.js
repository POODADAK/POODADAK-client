import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ButtonSmall from "../../common/components/buttons/ButtonSmall";

const StyledErrorPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

function ErrorPage({ error }) {
  const navigate = useNavigate();

  return (
    <StyledErrorPage>
      <div className="title">{error.title}</div>
      <div className="description">{error.description}</div>
      <ButtonSmall onClick={() => navigate("/")}>메인으로 가기</ButtonSmall>
    </StyledErrorPage>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default ErrorPage;
