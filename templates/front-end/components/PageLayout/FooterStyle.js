/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const FooterContainer = css`
  position: relative;
  flex: 0 0 auto;
  font-size: 22px;
  font-weight: 700;
  background-color: #f7f9fa;

  & > div {
    z-index: 1000;
    width: 100vw;
  }
`;

export const FooterContent = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  @media (min-width: 768px) {
    & {
      padding-top: 50px;
      padding-bottom: 10px;
    }
  }
  @media (min-width: 1256px) {
    & {
      max-width: 1256px;
      margin: 0 auto;
      padding: 50px 60px 0 60px;
    }
  }

  & p {
    font-size: 16px;
    color: gray;
  }
`;
