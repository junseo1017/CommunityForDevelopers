/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Container = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const LeftCard = css`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  flex: 1;
  margin-right: 20px;
`;

export const RightCard = css`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  flex: 0.8;
`;

export const LabelCss = css`
  .ant-form-item-label > label::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: "*";
  }
  *::before {
    box-sizing: border-box;
  }
`;

export const FormItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export const TailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
