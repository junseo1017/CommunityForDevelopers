/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const EditPwContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
  min-height: 420px;
  border-radius: 2px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

export const EditPwFormStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  & > h2 {
    font-weight: 700;
    font-size: 24px;
  }
  & > form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  & label {
    font-size: 16px;
    font-weight: 700;
  }
  & input {
    border: 1px solid #aca3a37b;
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 40px;
    width: 100%;
    padding-left: 10px;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    gap: 10px;
  }
`;
