/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const FlexBox = css`
  display: flex;
  width: 80%;
  padding: 0 1em;
  gap: 2em;
`;

export const ColFlexBox = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 0 1em;

  & > a {
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
  width: 80%;
  padding: 1em;
}
`;

export const CardFormContainer = css`
  width: 80%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CardFormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  & label {
    font-weight: 500;
  }

  & input {
    border: 1px solid #aca3a37b;
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    height: 40px;
    width: 100%;
  }

  & textarea {
    border: 1px solid #aca3a37b;
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 50%;
  }

  & .markdown {
    width: 50%;
    height: 20em;
    border: 1px solid black;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    & input {
      width: 60%;
    }
  } ;
`;
