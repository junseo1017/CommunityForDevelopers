/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const myInfoCardContainer = css`
  width: 70%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const myInfoFormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 60%;
  & label {
    font-weight: 500;
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
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 100%;
    & input {
      width: 100%;
    }
  } ;
`;

export const myInfoSubmitBtnStyle = css`
  background-color: #aca3a37b;
  margin-top: 20px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #aca3a37b;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.1);
  transition: 100ms linear;
  :hover {
    background-color: black;
    color: white;
  }
  font-weight: 700;
`;

export const myInfoSkills = css`
  width: 100%;
  & > div {
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 10px;
  }
`;
