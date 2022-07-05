/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react';

export const HeaderContainer = css`
  position: relative;
  flex: 0 0 auto;
  font-size: 16px;
  font-weight: 700;
  & > div {
    position: fixed;
    z-index: 1000;
    top: 0px;
    height: 81px;
    width: 100vw;
    border-bottom: 1px solid #eaedef;
    background-color: white;
  }
`;

export const HeaderContent = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 81px;
  & nav {
    display: flex;
    flex-direction: row;
    gap: 3vw;
  }
  & nav div {
    display: flex;
    flex-direction: row;
    gap: 1.5vw;
  }
  @media (min-width: 768px) {
    & {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  @media (min-width: 1256px) {
    & {
      max-width: 1256px;
      margin: 0 auto;
      padding: 0 60px;
    }
  }
`;

export const HeaderLogo = css``;
