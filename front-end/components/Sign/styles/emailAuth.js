/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const emailAuthStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & * {
    margin: 0;
    padding: 0;
  }

  & h3 {
    font-size: 12px;
    color: rgb(160, 160, 160);
    text-align: end;
    text-decoration: underline;
    font-weight: 700;
    cursor: pointer;
  }
  & > div {
    display: flex;
    flex-direction: row !important;
    justify-content: space-between;
    align-items: center;
    padding: 3px 10px 0 0;
  }
`;

export const EmailAuthBtn = css`
  width: 360px;
  height: 40px !important;
  background-color: rgb(210, 210, 210);
  border: none !important;
  transition: 100ms linear;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: black;
    color: white;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const EmailAuthDoneBtn = css`
  width: 360px;
  height: 40px !important;
  background-color: rgb(230, 230, 230);
  color: rgb(190, 190, 190);
  border: none !important;
  transition: 100ms linear;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
