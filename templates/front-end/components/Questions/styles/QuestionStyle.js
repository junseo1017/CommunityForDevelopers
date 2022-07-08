/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const FlexBox = css`
  display: flex;
  width: 100%;
  padding: 0 1em;
  margin: 1em;
  gap: 2em;
`;

export const ColFlexBox = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1em;

  & > button,
  a {
    align-self: flex-end;
  }
`;

export const TitleContainer = css`
  display: flex;
  gap: 1.5em;
  align-items: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & svg,
  a {
    font-size: 2em;
    font-weight: bold;
  }

  & sup {
    top: 2em;
  }

  @media (max-width: 768px) {
    & svg,
    a {
      font-size: 1.5em;
      font-weight: bold;
    }

    & sup {
      font-size: 0.5em;
      top: 2em;
    }
  }
`;

export const DescriptionContainer = css`
  display: flex;
  flex-direction: column;

  & div:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & div:last-child {
    opacity: 0.75;
    align-self: flex-end;
  }
`;

export const CommentsContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2em;
`;

export const CollapseStyle = css`
  width: 95%;
  margin: 0 auto;
  background-color: none;
`;

export const CardFormContainer = css`
  width: 80%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TextContainer = css`
  padding: 0 2em;
`;

export const EditorContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > h1 {
    align-self: center;
  }

  & > button {
    align-self: end;
  }
`;
