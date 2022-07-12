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

  & svg,
  a {
    font-size: 2em;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  margin-top: 1em;

  & div:first-of-type {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & div:last-of-type {
    opacity: 0.75;
    align-self: flex-end;
  }
`;

export const DetailContainer = css`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
`;

export const DetailQuestionContainer = css`
  display: flex;
  flex-direction: column;

  & h1 {
    color: #1890ff;
    font-weight: 700;
  }

  & div:first-of-type,
  div.tag-container {
    align-self: flex-start;

    & p {
      margin: 0.25em 0;
      font-size: 12px;
    }
  }

  & div,
  button {
    align-self: flex-end;
  }
`;

export const DetailAnswerContainer = css`
  display: flex;
  flex-direction: column;

  & div.answer-title {
    display: flex;
    flex-direction: row;
    gap: 1em;

    & h2 {
      font-weight: 700;
    }
  }

  & div.ant-collapse {
    background-color: #fff;
  }
`;

export const CommentsContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2em;
`;

export const CollapseStyle = css`
  width: 100%;
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
  padding: 1em;

  & h2 {
    text-align: center;
    color: #1890ff;
    font-weight: bold;
  }
`;

export const EditorContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2em;
  gap: 1em;

  & > h1 {
    color: #1890ff;
    font-weight: bold;
  }

  & > input.ant-input-lg {
    width: 50%;
  }

  & > span,
  input.ant-input-sm {
    width: 7em;
  }

  & > div {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
  }

  & > button {
    align-self: end;
  }

  @media (max-width: 768px) {
    & > input.ant-input-lg,
    input.ant-input-sm {
      width: 80%;
    }
  }
`;
