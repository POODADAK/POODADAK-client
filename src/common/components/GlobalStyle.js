import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }

  body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 428px;
    min-width: 320px;
    font-family: Noto Sans KR, sans-serif;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
