/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const responsiveContainer = css`
  @media (min-width: 320px) {
    padding: 10px;
    font-size: 12px;
  }
  @media (min-width: 768px) {
    padding: 20px;
    font-size: 16px;
  }
  @media (min-width: 1256px) {
    max-width: 1256px;
    margin: 0 auto;
    padding: 20px 60px;
  }
`;
