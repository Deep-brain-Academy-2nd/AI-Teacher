import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { colors, fontSize } from './theme';

const GlobalStyle = createGlobalStyle`
    ${reset};
    body {
        line-height: 1.5;
        font-family: 'Spoqa Han Sans Neo', 'sans-serif', 'apple SD gothic Neo', monospace;
        *:focus {
          outline: none;
        }
        * {
          box-sizing: border-box;
        }
        background: ${colors.background};
        color: ${colors.fontDefault};
        font-size: ${fontSize.t3};
      }

`;

export default GlobalStyle;
