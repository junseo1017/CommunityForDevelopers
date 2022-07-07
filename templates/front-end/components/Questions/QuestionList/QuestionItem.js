/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Badge, Tag } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { TitleContainer, DescriptionContainer } from "../styles/QuestionStyle";

const QuestionItem = ({ qusetId, title, description, recommendations, tags, user, date }) => {
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <>
      <div css={TitleContainer}>
        <Badge count={recommendations}>
          <MessageOutlined />
        </Badge>
        <a href={`/questions/${qusetId}`}>{title}</a>
      </div>
      <div css={DescriptionContainer}>
        <div>{description}</div>
        <div>
          {tags.map((tag) => {
            return <Tag>{tag}</Tag>;
          })}
        </div>
        <div>{`(${user}가 ${formattedDate}에 질문함)`}</div>
      </div>
    </>
  );
};

export default QuestionItem;
