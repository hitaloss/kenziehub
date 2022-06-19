import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    list-style: none;
  }

  body {
    background-color: #121214
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    scroll-behavior: smooth
  }

  :root {
    --black: #000000;
    --veryLightGray: #F8F9FA;
    --ligthGray: #868E96;
    --gray: #343b41;
    --darkGray: #212529;
    --white: #FFFFFF
    --pink: #FF577F;
  }
`;
