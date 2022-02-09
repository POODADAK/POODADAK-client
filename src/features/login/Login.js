import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function login() {
      const code = new URL(window.location.href).searchParams.get("code");
      const state = new URL(window.location.href).searchParams.get("state");

      try {
        if (!state) {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(
            "auth/kakao",
            { token: code },
            { withCredentials: true }
          );
        } else {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post(
            "auth/naver",
            { code, state },
            { withCredentials: true }
          );
        }

        navigate("/");
      } catch (error) {
        setIsError(true);
      }
    }

    login();
  }, []);

  return (
    <>
      {!isError && <div>로그인 처리중</div>}
      {isError && (
        <>
          <div>로그인 실패</div>
          <Link to="/">메인으로 돌아가기</Link>
        </>
      )}
    </>
  );
}

export default Login;
