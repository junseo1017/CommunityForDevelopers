/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const CardDetail = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap: 1.5rem;
  }
  & p {
    font-weight: 700;
  }
  & h3 {
    font-weight: 900;
  }
`;

export const ProfileCardContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
      gap: 30px;
    }
  }
`;

export const ProfileCardContent = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
  border-top: solid 1px #eaedef;
  padding-top: 20px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: none;
    gap: 20px;
    padding: 0px;
    p,
    h3 {
      margin: 0;
    }
  }
  & > div {
    ${CardDetail}
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
    padding: 20px 0 0 0;
  }
`;
