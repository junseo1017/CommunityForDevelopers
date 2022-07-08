/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const ProfileContentContainer = css`
  width: 100%;
  padding: 20px 10px 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & > div {
  }
`;
