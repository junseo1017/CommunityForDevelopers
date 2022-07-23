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
  gap: 15px;
  margin: 0;
  padding: 0;
  & a {
    color: rgb(80, 80, 80);
    font-weight: 600;
    transition: 100ms linear;
    &:hover {
      color: black;
      padding-bottom: 2px;
      border-bottom: 3px solid black;
    }
  }
`;
