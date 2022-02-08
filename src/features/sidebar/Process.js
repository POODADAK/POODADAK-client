import axios from "axios";
import React, { useEffect } from "react";

function Process() {
  const clientToken = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    async function login() {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL,
        {
          token: clientToken,
        },
        { withCredentials: true }
      );
    }
    login();
  }, []);

  return <div>로그인 처리중</div>;
}

export default Process;
