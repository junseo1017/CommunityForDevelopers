/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const StepsPadding = css`
  padding: 40px 20px;
  .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-icon {
    background: #000;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #fff;
    border-color: #000;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #fff;
    border-color: #000;
  }
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #000;
  }
  .ant-steps-item-finish
    > .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-title::after {
    background-color: #000;
  }
`;

export const ButtonCss = css`
  background: #1890ff;
  border-color: #1890ff;
  :hover {
    background: #69c0ff;
    border-color: #69c0ff;
  }
`;
