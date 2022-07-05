/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react';

export const ContentContainer = css`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  margin-top: 81px;
  @media (min-width: 768px) {
    & {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  @media (min-width: 1256px) {
    & {
      max-width: 1256px;
      margin: 81px auto 0 auto;
      padding: 0 60px;
    }
  }
`;
