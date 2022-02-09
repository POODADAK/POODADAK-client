import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import close from "../../assets/icon-close-black.png";
import right from "../../assets/icon-right-black.png";
import kakao from "../../assets/kakao.svg";
import naver from "../../assets/naver.svg";

const StyledSidebar = styled.div`
  width: 280px;
  height: 500px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  .close {
    width: 240px;
    height: 40px;
    font-size: large;
    color: black;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .description {
    width: 240px;
    font-size: small;
    color: gray;
    margin-bottom: 20px;
  }
  .sns-login {
    cursor: pointer;
  }
  .list {
    width: 240px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .line {
    width: 230px;
    border-top: 1px solid gray;
  }
  .list-content {
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
  }
`;

function Sidebar({ onClick }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  function kakaoLogin() {
    setIsLogin(true);
  }

  function naverLogin() {
    setIsLogin(true);
  }

  function logout() {
    setIsLogin(false);
  }

  return (
    <StyledSidebar>
      <div
        className="close"
        onClick={() => {
          onClick();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          onClick();
        }}
      >
        <img src={close} alt="닫기" />
        닫기
      </div>
      {!isLogin && (
        <>
          <div className="description">
            리뷰를 남기거나 SOS를 보내려면 로그인 하셔야 합니다.
          </div>
          <div
            className="sns-login"
            onClick={kakaoLogin}
            role="button"
            tabIndex={0}
            onKeyDown={kakaoLogin}
          >
            <img src={kakao} alt="카카오 로그인" />
          </div>
          <div
            className="sns-login"
            onClick={naverLogin}
            role="button"
            tabIndex={0}
            onKeyDown={naverLogin}
          >
            <img src={naver} alt="네이버 로그인" />
          </div>
        </>
      )}
      {isLogin && (
        <>
          <div
            className="list"
            role="button"
            onClick={() => navigate("/users/:id")}
            tabIndex={0}
            onKeyDown={() => navigate("/users/:id")}
          >
            <hr className="line" />
            <div className="list-content">
              내 리뷰 보러가기
              <img src={right} alt="네이버 로그인" />
            </div>
          </div>
          <div
            className="list"
            role="button"
            onClick={logout}
            tabIndex={0}
            onKeyDown={logout}
          >
            <hr className="line" />
            <div className="list-content">
              로그아웃
              <img src={right} alt="네이버 로그인" />
            </div>
          </div>
        </>
      )}
    </StyledSidebar>
  );
}

Sidebar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Sidebar;
