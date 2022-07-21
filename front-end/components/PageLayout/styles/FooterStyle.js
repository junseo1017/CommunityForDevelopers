/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { responsiveContainer } from "./common";
export const FooterContainer = css`
  position: relative;
  flex: 0 0 auto;
  height: 200px;

  background-color: #f7f9fa;
  & > div {
    z-index: 1000;
  }
`;

export const FooterContent = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  & * {
    margin: 0;
  }
  & > h2 {
    font-size: 22px;
    font-weight: 700;
    color: rgb(100, 100, 100);
  }
  & p,
  h3 {
    font-size: 16px;
    font-weight: 700;
    color: rgb(180, 180, 180);
  }
  ${responsiveContainer}
`;
