import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    width: auto;
    display: flex;
    justify-content: center;
    background-color: white;
    height: 100vh;
  }

  body {
    max-width: 428px;
    min-width: 320px;
    width: 100%;
    height: inherit;
    font-family: Noto Sans KR, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
