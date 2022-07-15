/** @jsxImportSource @emotion/react */
import {
  LabelCss,
  FormItemLayout,
  TailFormItemLayout,
  Container,
  LeftCard,
  RightCard,
} from "./styles/CreatePortfolioCardStyle";
import { UploadOutlined } from "@ant-design/icons";
import TagRender from "./TagRender";
import useSelects from "../../hooks/useSelects";
import {
  Steps,
  Divider,
  Space,
  Typography,
  Card,
  Button,
  Form,
  Input,
  Select,
  Tag,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PortfolioCard from "./PortfolioCard";
import { css } from "@emotion/react";
const { Step } = Steps;

const CreatePortfolioCard = ({ setPortfCardValue }) => {
  const [items, name, onNameChange, addItem] = useSelects();
  //const portfolioValue = useSelector(({ portfolio }) => portfolio);

  const onFinish = (values) => {
    values;
  };
  const onChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [form] = Form.useForm();
  const titleValue = Form.useWatch("title", form);
  const descriptionValue = Form.useWatch("description", form);
  const imageValue = Form.useWatch("image", form);
  const skillsValue = Form.useWatch("skills", form);

  const { Option } = Select;

  return (
    <div css={Container}>
      <Card css={LeftCard}>
        <Form
          onValuesChange={(value, allValues) => {
            setPortfCardValue(allValues);
          }}
          {...FormItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          scrollToFirstError>
          <div css={LabelCss}>
            <Form.Item label="썸네일 이미지">
              <Form.Item
                className="image-required"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={[
                  {
                    required: true,
                    message: "썸네일 이미지를 첨부해주세요",
                  },
                ]}>
                <Upload.Dragger name="files" /*action="/upload.do"*/ maxCount={1}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </div>
          <Form.Item
            name="title"
            label="제목"
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
            label="설명"
            rules={[
              {
                required: true,
                message: "설명을 작성해주세요",
              },
            ]}>
            <Input.TextArea showCount maxLength={46} />
          </Form.Item>
          <Form.Item
            name="skills"
            label="skills"
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
              tagRender={TagRender}
              placeholder="사용했던 skills를 선택해주세요."
              //defaultValue={["gold", "cyan"]}
              style={{
                width: "100%",
              }}
              options={items}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    align="center"
                    style={{
                      padding: "0 8px 4px",
                    }}>
                    <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
                    <Typography.Link
                      onClick={addItem}
                      style={{
                        whiteSpace: "nowrap",
                      }}>
                      <PlusOutlined /> Add item
                    </Typography.Link>
                  </Space>
                </>
              )}>
              {items.map((item) => (
                <Option key={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Card>
      <Card css={RightCard}>
        <PortfolioCard
          title={titleValue}
          description={descriptionValue}
          image={imageValue}
          skills={skillsValue}
        />
      </Card>
    </div>
  );
};

export default CreatePortfolioCard;
