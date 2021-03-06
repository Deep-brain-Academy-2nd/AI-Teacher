import { css } from 'styled-components';
import color from './colors';

import { mediaQuery, pxToVw } from './media';

export const basicWrap = css`
  width: 100%;
  min-height: 100vh;
  padding: ${pxToVw(66)} ${pxToVw(24)};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  ${mediaQuery(640)} {
    width: 640px;
    margin: 0 auto;
    padding: 66px 24px;
  }
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexAlignCenter = css`
  display: flex;
  align-items: center;
`;

export const flexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
