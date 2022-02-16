import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    width: 100vw;
    height: 93.4%;
    background-color: white;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  body {
    flex-grow: 1;
    width: 100%;
    min-width: 320px;
    max-width: 428px;
    font-family: Noto Sans KR, sans-serif;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
