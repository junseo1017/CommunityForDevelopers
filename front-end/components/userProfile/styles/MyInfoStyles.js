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
  gap: 16px;
  width: 60%;
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
  & button {
    background-color: white;
    height: 40px;
    width: 50%;
    border: 2px solid #aca3a37b;
    border-radius: 5px;
    font-size: 14px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
    transition: 100ms linear;
    cursor: pointer;
    &:hover {
      box-shadow: none;
    }
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
  & span {
    cursor: pointer;
  }
`;

export const portfolioContainer = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  & * {
    margin: 0;
  }
  @media (max-width: 768px) {
    justify-content: center;
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
      max-height: 260px;
      border-radius: 5px;
    }

    & > div:first-of-type {
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 0 0 10px 10px;
      background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 60%);
      opacity: 0;
      transition: 150ms;

      h3 {
        font-size: 16px;
        font-weight: 900;
        color: white;
      }
      p {
        font-size: 14px;
        font-weight: 500;
        color: rgb(240, 240, 240);
        opacity: 0.8;
      }
    }

    & > div:last-of-type {
      position: absolute;
      opacity: 0;
      top: 10px;
      right: 10px;
      transition: 150ms;

      @media (max-width: 768px) {
        top: 10px;
        right: 10px;
      }
      & > div {
        width: 60px;
        height: 25px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
      }
      h3 {
        color: white;
        text-align: center;
        font-size: 16px;
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
      @media (max-width: 768px) {
        gap: 2px;
        font-size: 11px;
      }
    }

    & > div:last-of-type {
      display: flex;
      align-items: center;
      gap: 5px;
      @media (max-width: 768px) {
        gap: 2px;
      }
    }
  }
`;

export const popoverStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 100px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px; /* 스크롤바 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바 길이 */
    background: rgb(190, 190, 190); /* 스크롤바 색상 */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /*스크롤바 배경 색상*/
  }
`;

export const qnaContainer = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
    cursor: pointer;
    color: rgb(220, 220, 220);
  }
`;

export const QnAContentStyle = css`
  width: 100%;
  & > section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 730px;
    overflow: hidden;
    padding: 20px 0;
    border-bottom: 1px solid rgb(190, 190, 190);
    & * {
      margin: 0;
    }

    & > div {
      width: 100%;
      h2 {
        font-size: 22px;
        font-weight: 700;
        color: #1890ff;
        @media (max-width: 768px) {
          font-size: 18px;
        }
      }
      p {
        font-size: 14px;
        color: rgb(150, 150, 150);
        @media (max-width: 768px) {
          font-size: 12px;
        }
      }
      a {
        color: black;
      }
    }
    & > div:first-of-type {
      & > a {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    }
    & > div:last-of-type {
      display: flex;
      justify-content: space-between;

      @media (max-width: 768px) {
        justify-content: start;
        flex-direction: column;
        gap: 10px;
      }

      & > span {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
    }
  }
`;
