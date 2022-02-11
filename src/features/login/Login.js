import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import authenticate from "../../common/api/auth";
import { userLoggedIn } from "./loginSlice";

const LoginProcessContainer = styled.div`
  width: inherit;
  height: inherit;
  padding-top: 1rem;
  padding: 1rem;
  background-color: black;

  .title {
    margin-top: 0;
    color: #bc955c;
  }

  .message {
    color: white;
  }

  .redirectionLink,
  .redirectionLink:visited {
    color: white;
  }
`;

function Login() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("unknown");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getToken() {
      const code = new URL(window.location.href).searchParams.get("code");
      const state = new URL(window.location.href).searchParams.get("state");

      try {
        await authenticate(state, code);
        dispatch(userLoggedIn());
        navigate("/");
      } catch (error) {
        const fetchedErrorMessage = error.response.data.errMessage
          ? error.response.data.errMessage
          : error.message;

        setErrorMessage(fetchedErrorMessage);
        setIsError(true);
      }
    }

    getToken();
  }, []);

  return (
    <>
      {!isError && (
        <LoginProcessContainer>
          <h1 className="title">로그인 시도중...</h1>
        </LoginProcessContainer>
      )}
      {isError && (
        <LoginProcessContainer>
          <h1 className="title">로그인 실패</h1>
          <p className="message">
            (이메일과 비밀번호 모두 동의 해야 이용이 가능합니다...)
          </p>
          <p className="message">{`오류 메세지: ${errorMessage}`}</p>
          <Link to="/" className="redirectionLink">
            메인으로 돌아가기
          </Link>
        </LoginProcessContainer>
      )}
    </>
  );
}

export default Login;
