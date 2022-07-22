/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { responsiveContainer } from "./common";
export const FooterContainer = css`
  position: relative;
  flex: 0 0 auto;

  background-color: #f7f9fa;
  & > div {
    z-index: 1000;
  }
`;

export const FooterContent = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 60px;
  & * {
    margin: 0;
  }
  & > div:first-of-type {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > address {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      h4 {
        font-size: 24px;
        font-weight: 900;
        color: rgb(120, 120, 120);
      }
      p {
        font-size: 16px;
        font-weight: 700;
        color: rgb(180, 180, 180);
      }
    }
    & > p {
      color: rgb(180, 180, 180);
      font-size: 14px;
      font-weight: 700;
    }
  }

  & > div:last-of-type {
    display: flex;
    justify-content: start;
    gap: 5%;
    ul {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-weight: 300;
      padding: 0;
      list-style: none;
      color: rgb(140, 140, 140);
      h4 {
        font-weight: 700;
        color: rgb(140, 140, 140);
      }
      div {
        font-size: 14px;
        color: rgb(160, 160, 160);
        font-weight: 500;
        & > * {
          padding-bottom: 2px;
        }
      }
    }
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 30px;
    }
  }
  ${responsiveContainer}
`;
