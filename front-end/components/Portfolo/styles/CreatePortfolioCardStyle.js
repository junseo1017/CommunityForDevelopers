/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const formContainer = css`
  width: 100%;
`;
export const fontWeight = css`
  font-weight: 500;
`;

export const submitButton = css`
  padding-bottom: 20px;
  display: flex;
  justify-content: end;
  flex: 1;
  .ant-btn-primary {
    background-color: #000;
    border-color: #000;
  }
  .ant-btn-primary: hover {
    background-color: #bbb;
    border-color: #bbb;
  }
  .ant-btn-primary: focus {
    background-color: #000;
    border-color: #000;
  }
  .ant-btn-default: hover {
    border-color: #000;
    color: #000;
  }
  .ant-btn-default: focus {
    border-color: #000;
    color: #000;
  }
`;

export const Container = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftCard = css`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  flex: 1.5;
  width: 100%;
  height: 100%;

  // .ant-form-item-label {
  //   flex: 0 0 100%;
  //   max-width: 100%;
  //   justify-self: start;
  //   padding: 0 0 8px;
  //   line-height: 1.5715;
  //   white-space: initial;
  //   text-align: left;
  //}
`;

export const RightCard = css`
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  flex: 1;
  width: 100%;
  height: 100%;
`;

//ant-form-item-explain-error
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
