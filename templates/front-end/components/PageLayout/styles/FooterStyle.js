/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { responsiveContainer } from "./common";
export const FooterContainer = css`
  position: relative;
  flex: 0 0 auto;
  height: 200px;
  font-size: 22px;
  font-weight: 700;
  background-color: #f7f9fa;
  & > div {
    z-index: 1000;
  }
`;

export const FooterContent = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  ${responsiveContainer}

  & p {
    font-size: 16px;
    color: gray;
  }
`;
