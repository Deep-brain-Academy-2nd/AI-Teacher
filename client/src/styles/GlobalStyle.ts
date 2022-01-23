import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};
    body {
        font-family:'Noto Sans KR', sans-serif, 'apple SD gothic Neo', monospace;
        *:focus {
          outline: none;
        }
        * {
          box-sizing: border-box;
        }   
      }

`;

export default GlobalStyle;
