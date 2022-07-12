/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const profileNavContainer = css`
  border-bottom: 1px solid #eaedef;
  padding-bottom: 20px;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding-bottom: 10px;
  }
`;

export const profileNavStyle = css`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5vw;
  margin: 0;
  padding: 0;
  & a {
    color: black;
    font-weight: 600;
  }
`;
