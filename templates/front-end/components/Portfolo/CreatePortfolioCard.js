import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Steps, Card, Button, Form, Input, Select, Tag, Upload } from "antd";
import PortfolioCard from "./PortfolioCard";

const { Step } = Steps;

const options = [
  {
    value: "gold",
  },
  {
    value: "lime",
  },
  {
    value: "green",
  },
  {
    value: "cyan",
  },
];

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}>
      {label}
    </Tag>
  );
};
const tagsOptions = [
  {
    value: "gold",
    label: "React",
  },
  {
    value: "lime",
    label: "Typescript",
  },
  {
    value: "green",
    label: "Redux",
  },
  {
    value: "cyan",
    label: "Next js",
  },
];
const formItemLayout = {
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
const tailFormItemLayout = {
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

const CreatePortfolioCard = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}>
      <Card
        style={{
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
          flex: 1,
          marginRight: 20,
        }}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError>
          <Form.Item label="Dragger">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="title"
            label="title"
            rules={[
              {
                required: true,
                message: "제목을 작성해주세요",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="description"
            rules={[
              {
                required: true,
                message: "설명을 작성해주세요",
              },
            ]}>
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item
            name="select"
            label="Select"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select your country!",
              },
            ]}>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              //defaultValue={["gold", "cyan"]}
              style={{
                width: "100%",
              }}
              options={options}
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card style={{ boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.2)", flex: 0.8 }}>
        <PortfolioCard />
      </Card>
    </div>
  );
};

export default CreatePortfolioCard;
