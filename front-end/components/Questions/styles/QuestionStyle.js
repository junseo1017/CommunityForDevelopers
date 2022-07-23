/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const SearchBarContainer = css`
  width: 100%;
  margin-top: 1em;
  background-color: #f9f9f9;
  border-radius: 2.5em;

  & input {
    width: 100%;
    height: 3em;
    padding: 0 1em;
    margin: 0 auto;

    font-size: 1.5em;

    border: 2px solid rgba(190, 190, 190);
    border-radius: 1.5em;
    opacity: 0.75;
    outline: none;
    font-weight: 700;

    &:focus {
      border: 2px solid rgba(190, 190, 190);
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
  gap: 0.75em;
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
  margin-top: 0.25em;

  & span.descriptions {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(100, 100, 100);
  }

  & div.tag-container {
    margin-top: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .ant-tag {
      margin-right: 0.25em;
    }

    & > span {
      color: rgba(190, 190, 190);
    }
  }

  @media (max-width: 768px) {
    & div.tag-container {
      flex-direction: column;
      align-items: flex-end;
      margin-top: 0.5em;
      gap: 0.5em;

      & .ant-tag {
        font-size: 0.625em;
        margin-left: 0.5em;
      }

      & > span {
        font-size: 0.625em;
      }
    }
  }
`;

export const DetailContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
`;

export const DetailQuestionContainer = css`
  display: flex;
  flex-direction: column;

  & div.button-wrapper {
    align-self: flex-end;

    & button {
      margin: 0 0.5em;
      padding: 0;
      background-color: #ffffff;
      border: none;
      color: rgba(120, 120, 120);
      font-size: 0.9em;

      &:hover {
        color: #000;
        font-weight: bold;
      }
    }
  }

  & h1 {
    width: 100%;
    color: #1890ff;
    font-weight: 700;
    word-break: break-all;
    margin-bottom: 0;
  }

  & div.badge-container,
  div.tag-container {
    align-self: flex-start;
  }

  & div.info-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0.5em 0;

    & button {
      height: 3em;
      padding: 0 1.5em;
      border: none;
      border-radius: 5px;
      background-color: #1890ff;
      font-size: 1em;
      font-weight: bold;
      color: #fff;
      align-self: flex-end;

      &:hover {
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }

  & div.info-box {
    font-size: 0.75em;

    & p {
      margin: 0;
    }
  }

  & div.answer-editor {
    display: flex;
    flex-direction: column;

    & button {
      align-self: flex-end;
    }
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

    & div.button-wrapper {
      width: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      & button {
        width: 3em;
        margin: 0;
        padding: 0.25em;
        background-color: #ffffff;
        border: none;
        color: rgba(120, 120, 120);
        font-size: 0.9em;

        &:hover {
          color: #000;
          font-weight: bold;
        }
      }
    }

    & div.answer-mode {
      display: flex;
      gap: 1em;
    }
  }

  & div.ant-collapse.ant-collapse-icon-position-start {
    background-color: #fff;
    margin-top: 1.5em;
  }

  & div.badge-container {
    justify-content: flex-end;
  }

  & span.ant-badge {
    &:hover {
      color: #1890ff;
    }
  }

  & div.ant-comment-content-detail {
    position: relative;
  }

  & button.comment-delete {
    width: 3em;
    margin: 0;
    padding: 0.25em;
    background-color: #ffffff;
    border: none;
    color: rgba(120, 120, 120);
    font-size: 0.9em;
    position: absolute;
    top: 0;
    right: 0;

    &:hover {
      color: #000;
      font-weight: bold;
    }
  }
`;

export const CommentsContainer = css`
  display: flex;
  flex-direction: column;

  & div.comment-container {
    position: relative;
  }

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
  height: auto;
  flex-direction: column;
  align-items: center;
  padding: 1em 2em;
  gap: 1em;
  margin-top: 1em;

  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

  & > h1 {
    color: #1890ff;
    font-weight: bold;
  }

  & > input.ant-input-lg {
    width: 100%;
  }

  & span.ant-tag {
    align-self: flex-end;
    margin: 0;
  }

  & > input.ant-input.ant-input-sm {
    width: 30%;
    align-self: flex-end;
    margin: 0;
  }

  & > div.tags-container {
    display: flex;
    flex-direction: row;
    gap: 0.25em;
    align-self: flex-end;

    & span.ant-tag.tags-input {
      margin: 0;
    }
  }

  & div.editor-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;

    & button {
      align-self: end;
    }
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

export const AnswerEditorContainer = css`
  width: 100%;
  height: auto;
  flex-direction: column;
  align-items: center;
  padding: 1em 2em;
  gap: 1em;
  margin-top: 1em;

  display: none;

  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

  & > h2 {
    font-weight: bold;
  }

  & > input.ant-input-lg {
    width: 100%;
  }

  & div.editor-container {
    width: 100%;
    margin: 0 auto;
    border: 1px solid;
    display: flex;
    flex-direction: column;

    & button {
      align-self: end;
    }

    & div.ce-block {
      width: 100%;
    }
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
