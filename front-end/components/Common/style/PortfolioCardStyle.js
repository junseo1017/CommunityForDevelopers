import { css } from "@emotion/react";

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

export const portfolioStyle = css`
  display: flex;
  flex-direction: column;

  & > div:first-of-type > div {
    width: 100%;
    position: relative;

    & > img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }

    & > div:first-of-type {
      width: 100%;

      position: absolute;
      bottom: 0;
      padding: 0 0 10px 10px;
      background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 20%);

      opacity: 0;
      transition: 150ms;

      h3 {
        font-size: 16px;
        font-weight: 700;
        color: white;
        margin-bottom: 0;
        padding-top: 15px;
      }
      p {
        font-size: 14px;
        font-weight: 500;
        color: rgb(240, 240, 240);
        opacity: 0.8;
        margin-bottom: 0;
      }
      @media (max-width: 768px) {
        opacity: 1;
      }
    }

    & > div:last-of-type {
      position: absolute;

      opacity: 0;
      top: 10px;
      right: 10px;
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
      font-size: 15px;
    }

    & > div:first-of-type {
      h3 {
        margin-bottom: 0;
      }
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
      p {
        margin-bottom: 0;
      }
      div + p {
        padding-left: 2.5px;
      }
      p + div {
        padding-left: 7px;
      }
      display: flex;
      align-items: center;
      @media (max-width: 768px) {
        gap: 2px;
      }
    }
  }
`;
