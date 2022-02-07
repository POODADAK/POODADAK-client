import React from "react";
import styled from "styled-components";

const KakaoLoginButton = styled.a`
  display: block;
  margin: 0 auto;
  width: 85.74%;
  height: 3.5rem;
  background-image: url(/images/kakaoLoginButton.png);
  background-size: 100% 100%;
`;

function Kakao() {
  return (
    <KakaoLoginButton
      href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REST_API_REDIRECT_URL}`}
    />
  );
}

export default Kakao;
