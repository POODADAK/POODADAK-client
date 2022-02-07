// import axios from "axios";
import React, { useEffect } from "react";

function Process() {
  // const clientToken = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    async function login() {
      // const test = await axios.post(process.env.REACT_APP_BACKEND_URL, {
      //   token: clientToken,
      // });
    }

    login();
  }, []);

  return <div>로그인 처리중</div>;
}

export default Process;
