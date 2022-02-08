import React from "react";
import styled from "styled-components";

const NaverLoginButton = styled.a`
  display: block;
  margin: 0 auto;
  width: 85.74%;
  height: 3.5rem;
  background-image: url(/images/naverLoginButton.png);
  background-size: 100% 100%;
`;

function Naver() {
  return (
    <NaverLoginButton
      href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP_NAVER_STATE}&redirect_uri=${process.env.REACT_APP_NAVER_CALLBACK_URL}`}
    />
  );
}

export default Naver;
