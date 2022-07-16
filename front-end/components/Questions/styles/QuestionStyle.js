/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const SearchBarContainer = css`
  width: 75%;

  & input {
    width: 100%;
    height: 3em;
    padding: 0 1em;
    margin: 0 auto;

    font-size: 1.5em;

    border: 2px solid gray;
    border-radius: 0.5em;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
    opacity: 0.75;
    outline: none;

    &:focus {
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
      border: 2px solid black;
      color: black;
    }
  }
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

  & span.descriptions {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & div.tag-container {
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > span {
      opacity: 0.75;
    }
  }
`;

export const DetailContainer = css`
  width: 100%;
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

  & div.badge-container,
  div.tag-container {
    align-self: flex-start;

    & p {
      margin: 0.25em 0;
      font-size: 12px;
    }
  }

  & > div,
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
    justify-content: space-between;
    align-items: center;

    & > h2 {
      width: 100%;
      font-weight: 700;
      margin: 0;
    }

    & div.answer-mode {
      display: flex;
      gap: 1em;
    }
  }

  & div.ant-collapse {
    background-color: #fff;
  }

  & div.badge-container {
    justify-content: flex-end;
  }
`;

export const CommentsContainer = css`
  display: flex;
  flex-direction: column;

  & div.ant-comment {
    margin: 0.5em 0;
    height: auto;
  }

  & div.ant-comment-content-detail {
    display: flex;
    flex-direction: column;

    & > div {
      height: 5em;
    }

    & button {
      align-self: flex-end;
      margin: 1em 0;
    }
  }

  & .mentions {
    font-weight: bold;
    color: #1890ff;
  }

  & .focused {
    background-color: rgb(24, 144, 255, 0.25);
  }
`;

export const CommentStyle = css`
  height: 5em;
`;

export const CollapseStyle = css`
  width: 100%;
  margin: 0 auto;
  background-color: none;
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

  border: 1px solid #000000;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

  & > h1 {
    color: #1890ff;
    font-weight: bold;
  }

  & > input.ant-input-lg {
    width: 50vw;
  }

  & > span,
  input.ant-input-sm {
    width: 7em;
  }

  & div.codex-editor--narrow {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    & div {
      width: 100%;
    }

    & div.ce-toolbar__plus {
      width: 2em;
      height: 2em;
    }
  }

  & button {
    align-self: end;
  }

  @media (max-width: 768px) {
    & > input.ant-input-lg,
    input.ant-input-sm {
      width: 100%;
    }

    & div.codex-editor--narrow {
      width: 100%;
    }
  }
`;
