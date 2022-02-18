import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    width: 100vw;
    background-color: gray;
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
    max-width: 430px;
    min-height: calc(100vh - 4rem);
    font-family: Noto Sans KR, sans-serif;
    margin: 0;
    -ms-overflow-style: none;
    display: flex;
    flex-direction: column;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
