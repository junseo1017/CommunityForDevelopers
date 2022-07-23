/** @jsxImportSource @emotion/react */
import { Button, Form, Input } from "antd";
import { css } from "@emotion/react";
import React from "react";
const { TextArea } = Input;

const CommentEditor = ({ onChange, onSubmit, submitting, value }) => {
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} css={TextAreaCss} />
      </Form.Item>
      <Form.Item>
        <div css={ButtonCss}>
          <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Add Comment
          </Button>
        </div>
      </Form.Item>
    </>
  );
};

export default CommentEditor;

const TextAreaCss = css`
  .ant-input {
    border-radius: 5px;
  }
`;

const ButtonCss = css`
  .ant-btn {
    border: 1px solid #aca3a37b;
    box-shadow: 0 2px 1px 0 rgb(0 0 0 / 10%);
    border-radius: 5px;
    background-color: #aca3a37b;
    color: black;
    transition: 100ms linear;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
