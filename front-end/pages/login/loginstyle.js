/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const LoginPageContainer = css`
  background-color: rgb(250, 250, 250);
  height: 100vh;
  padding: 40px 0 150px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vh;
  & h2 {
    font-size: 14px;
  }
  & .signUp {
    cursor: pointer;
  }

  & .ant-divider {
    width: 300px;
    margin: 0 !important;
    border-color: rgb(219, 219, 219);
  }

  & > section > div {
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 30px;
    }
  }
`;
