import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import errorCrying from "../../assets/error-crying.png";
import ButtonSmall from "../../common/components/buttons/ButtonSmall";

const StyledErrorPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  img {
    width: 300px;
  }
  .error {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .error-title {
      font-size: x-large;
    }
    .error-message {
      color: gray;
    }
  }
`;

function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state;

  return (
    <StyledErrorPage>
      <div className="image">
        <img src={errorCrying} alt="crying baby" />
      </div>
      <div className="error">
        <div className="error-title">
          {error ? error.title : "404 Not Found!"}
        </div>
        <div className="error-message">
          {error ? error.errorMsg : "잘못된 접근입니다!"}
        </div>
      </div>
      <div className="error-description">
        {error ? error.description : "url을 확인해 주세요!"}
      </div>
      <ButtonSmall onClick={() => navigate("/")}>메인으로 가기</ButtonSmall>
    </StyledErrorPage>
  );
}

export default ErrorPage;
