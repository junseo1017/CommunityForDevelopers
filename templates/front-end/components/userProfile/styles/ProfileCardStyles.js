/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const ProfileCardContainer = css`
  width: 300px;
  height: 400px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  margin: 0 10px;
  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
    margin: 10px 0;
  }
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & > div > div {
    @media (max-width: 768px) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const ProfileCardContent = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const CardProfile = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 26px;
    font-weight: 900;
  }
`;
