import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Process() {
  const navigate = useNavigate();

  useEffect(() => {
    async function login() {
      const code = new URL(window.location.href).searchParams.get("code");
      const state = new URL(window.location.href).searchParams.get("state");

      // eslint-disable-next-line no-unused-vars
      const result = await axios.post(
        "/auth/naver",
        {
          code,
          state,
        },
        { withCredentials: true }
      );
    }
    login();

    navigate("/");
  }, []);

  return <div>로그인 처리중</div>;
}

export default Process;
