import { css } from "@emotion/react";

export const TextCener = css`
  text-align: center;
`;
export const EditorSize = css`
  width: 100%;
  height: 100%;
  //background-color: #fafafa;
  background-color: #f7f9fa;
  .ce-block__content,
  .ce-toolbar__content {
    max-width: calc(100% - 80px) !important;
  }
  .cdx-block {
    max-width: 100% !important;
  }
`;
