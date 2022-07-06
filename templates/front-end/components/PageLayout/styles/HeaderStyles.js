/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { responsiveContainer } from "./common";
export const HeaderContainer = css`
  position: relative;
  flex: 0 0 auto;
  font-size: 16px;
  font-weight: 700;
  & a {
    color: black;
  }
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
  & > nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1vw;
  }
  & > nav > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5vw;
  }
  ${responsiveContainer}
`;
