import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    width: auto;
    display: flex;
    justify-content: center;
    background-color: white;
  }

  body {
    max-width: 428px;
    min-width: 320px;
    width: 100%;
    font-family: Noto Sans KR, sans-serif;
  }
`;

export default GlobalStyle;
