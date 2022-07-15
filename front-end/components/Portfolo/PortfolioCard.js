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
import Link from "next/link";
import Router from "next/router";
import {
  CardCss,
  ScrollDiv,
  IconCss,
  authorCss,
  skillsCss,
  colCss,
  rowCss,
} from "./styles/PortfolioCardStyle";
import millify from "millify";
import styled from "@emotion/styled";
import { Avatar, Card, Tag, Space, Col, Row } from "antd";
import React, { useCallback } from "react";
const { Meta } = Card;

const PortfolioCard = ({
  title,
  description,
  image,
  skills,
  author,
  comments,
  recommends,
  _id,
}) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const goDetailPortfolio = useCallback(() => {
    Router.push(`/portfolio/${_id}`).then();
  }, []);

  return (
    <Card
      onClick={goDetailPortfolio}
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
      <div css={skillsCss}>
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
        </ScrollDiv>
      </div>
      <Row justify="space-between" align="bottom" css={rowCss}>
        <Col span={8} css={colCss}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <div css={authorCss}>{author?.nickname || "에릭지이이"}</div>
        </Col>
        <Col span={16} css={IconCss}>
          <IconText icon={StarOutlined} text={millify(111155)} key="list-vertical-star-o" />
          <IconText icon={LikeOutlined} text={recommends || 0} key="list-vertical-like-o" />
          <IconText
            icon={MessageOutlined}
            text={comments?.length || 0}
            key="list-vertical-message"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default PortfolioCard;
