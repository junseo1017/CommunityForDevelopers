import Icon, {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { Avatar, Card, Tag, Space, Badge } from "antd";
import React from "react";
const { Meta } = Card;
export const CardCss = css`
  .ant-card-actions {
    border: none;
  }
  .ant-card-body {
    padding: 22px;
  }
`;

const ScrollDiv = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ddd;
  }
`;

const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;

const PortfolioCard = ({ title, description, image, skills }) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <Card
      css={CardCss}
      hoverable
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[]}>
      <Meta
        title={title || "제목"}
        description={
          <div>
            <div>{description || `한줄 설명`}</div>
          </div>
        }
      />
      <div
        style={{
          paddingTop: 20,
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-start",
          marginBottom: 5,
        }}>
        <ScrollDiv>
          {skills ? (
            skills.map((value, index) => (
              <Tag color="blue" key={`${value}${index}`}>
                {value}
              </Tag>
            ))
          ) : (
            <Tag color="white">magenta</Tag>
          )}

          <div style={{ verticalAlign: "middle" }}></div>
        </ScrollDiv>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 15 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <div style={{ paddingLeft: 3 }}>에릭지</div>
        </div>
        <Space>
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />
        </Space>
      </div>
    </Card>
  );
};

export default PortfolioCard;

// avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
