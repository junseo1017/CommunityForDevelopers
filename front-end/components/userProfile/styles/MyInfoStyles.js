/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const profileContentCardContainer = css`
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

export const portfolioContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  & * {
    margin: 0;
  }
`;

export const portfolioStyle = css`
  display: flex;
  flex-direction: column;
  & > div:first-of-type > div {
    width: 100%;
    position: relative;

    & > img {
      width: 100%;
      max-width: 350px;
      height: 100%;
      max-height: 230px;
      border-radius: 5px;
    }

    & > div {
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 0 0 10px 10px;
      background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 80%);
      opacity: 0;
      transition: 150ms;

      h3 {
        font-size: 22px;
        font-weight: 900;
        color: white;
      }
      P {
        font-size: 16px;
        font-weight: 500;
        color: rgb(240, 240, 240);
        opacity: 0.8;
      }
    }
    &:hover > div {
      display: block;
      opacity: 1;
    }
  }
  & > div:last-of-type {
    padding: 10px 5px 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & a {
      color: black;
    }

    & > div:first-of-type {
      display: flex;
      align-items: center;
      font-size: 13px;
      gap: 10px;
    }

    & > div:last-of-type {
      display: flex;
      align-items: center;

      gap: 10px;
    }
  }
`;

export const qnaContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const qnaNavStyle = css`
  display: flex;
  gap: 1.5vw;
  padding: 10px;
  border-bottom: 1px solid rgb(220, 220, 220);
  h3 {
    font-size: 22px;
    font-weight: 700;
    margin: 0;
  }
`;
