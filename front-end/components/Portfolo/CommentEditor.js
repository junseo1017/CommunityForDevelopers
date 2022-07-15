import { Button, Form, Input } from "antd";
import React from "react";
const { TextArea } = Input;

const CommentEditor = ({ onChange, onSubmit, submitting, value }) => {
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
};

export default CommentEditor;
