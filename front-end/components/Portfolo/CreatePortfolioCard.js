/** @jsxImportSource @emotion/react */
import {
  LabelCss,
  FormItemLayout,
  Container,
  LeftCard,
  RightCard,
  formContainer,
  submitButton,
} from "./styles/CreatePortfolioCardStyle";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
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
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PortfolioCard from "../Common/PortfolioCard";
import { useSelector } from "react-redux";
import { useState } from "react";

const CreatePortfolioCard = ({ onSubmitCard }) => {
  const [items, name, onNameChange, addItem] = useSelects();
  const { singlePortfolio } = useSelector((state) => state.portfolio);
  const [imgSrc, setImgSrc] = useState(singlePortfolio?.imgSrc);
  const [imgFormErr, setImgFormErr] = useState();
  console.log(singlePortfolio);
  const [imgFile, setImgFile] = useState();
  const { me } = useSelector((state) => state.user);
  //const portfolioValue = useSelector(({ portfolio }) => portfolio);

  const onFinish = (values) => {
    console.log(values);
    console.log(imgFile);
    if (!imgSrc) {
      setImgFormErr("error");
      message.error("썸네일 이미지를 첨부해주세요.");
      return;
    }
    onSubmitCard({ ...values, image: imgFile, imgSrc: imgSrc });
  };
  const onChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(info);
      const FileObj = info.fileList && info.fileList[0].originFileObj;
      setImgFile(FileObj);
      setImgFormErr();
      onPreview(info.file);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const onDrop = (e) => {
    console.log("Dropped files", e.dataTransfer.files);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    setImgSrc(image.src);
    //const imgWindow = window.open(src);
    //imgWindow?.document.write(image.outerHTML);
  };

  const onRemove = () => {
    setImgSrc(null);
    setImgFormErr("error");
  };

  const [form] = Form.useForm();
  const titleValue = Form.useWatch("title", form);
  const descriptionValue = Form.useWatch("description", form);
  const imageValue = Form.useWatch("image", form);
  const skillsValue = Form.useWatch("skills", form);
  const { Option } = Select;

  return (
    <>
      <Form
        css={formContainer}
        // onValuesChange={(value, allValues) => {
        //   setPortfCardValue(allValues);
        // }}
        {...FormItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError>
        <div css={submitButton}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              다음
            </Button>
          </Form.Item>
        </div>
        <div css={Container}>
          <Card css={LeftCard}>
            <div css={LabelCss}>
              <Form.Item label="썸네일 이미지">
                <Form.Item
                  className="image-required"
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  noStyle
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "썸네일 이미지를 첨부해주세요",
                  //   },
                  // ]}
                >
                  <ImgCrop rotate>
                    <Upload.Dragger
                      name="image"
                      /*action="/upload.do"*/ maxCount={1}
                      onChange={onChange}
                      onRemove={onRemove}
                      onDrop={onDrop}>
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint" style={{ color: "#ff4d4f" }}>
                        {imgFormErr ? "썸네일 이미지를 첨부해주세요." : <br />}
                      </p>
                    </Upload.Dragger>
                  </ImgCrop>
                </Form.Item>
              </Form.Item>
            </div>
            <Form.Item
              hasFeedback
              name="title"
              label="제목"
              initialValue={singlePortfolio.title}
              rules={[
                {
                  required: true,
                  message: "제목을 작성해주세요",
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              hasFeedback
              name="description"
              label="설명"
              initialValue={singlePortfolio.description}
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
              initialValue={singlePortfolio.skills}
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
          </Card>
          <Card css={RightCard}>
            <PortfolioCard
              title={titleValue}
              description={descriptionValue}
              image={imgSrc}
              skills={skillsValue}
              author={{ nickname: me.nickname, imgUrl: me.imgUrl }}
            />
          </Card>
        </div>
      </Form>
    </>
  );
};

export default CreatePortfolioCard;
