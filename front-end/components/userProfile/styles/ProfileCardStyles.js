/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

// 프로필 카드 하단 (포트폴리오, 스크랩,질문,답변 데이터 수)
const CardDetail = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p,
  h3 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 10px 0;
  }
  @media (max-width: 768px) {
    width: 120px;
    flex-direction: row;
    justify-content: end;
    align-items: stretch;
    gap: 1.5rem;
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
    height: 230px;
    margin: 10px 0;
  }
  & > section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & section {
    @media (max-width: 768px) {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      gap: 10px;
    }
  }
`;

export const ProfileCardContent = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  border-top: solid 1px #eaedef;
  padding: 20px 0 0 0;
  list-style: none;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: none;
    gap: 20px;
    padding-top: 20px 0 0 0;
  }
  & > li {
    ${CardDetail}
  }
`;

export const CardProfile = css`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > h2 {
    font-size: 26px;
    font-weight: 900;
    padding: 20px 0 0 0;
    text-align: center;
    @media (max-width: 768px) {
      width: 130px;
      font-size: 16px;
      font-weight: 700;
      padding: 10px 0 0 0;
    }
  }
`;
