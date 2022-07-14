/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { Badge, Tag } from "antd";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import { TitleContainer, DescriptionContainer } from "../styles/QuestionStyle";
import Link from "next/link";

const QuestionItem = ({ _id, title, recommends, contents, tags, user, date, answers }) => {
  const formattedDate = `${new Date(date).getFullYear()}년 ${
    new Date(date).getMonth() + 1
  }월 ${new Date(date).getDate()}일`;

  const filteredBlocks =
    JSON.parse(contents) &&
    JSON.parse(contents).blocks.map(({ type, data }) => {
      return type === "paragraph" || type === "header" ? data : "";
    });

  const texts = filteredBlocks.map((block) => block.text).slice(0, 1);

  answers = answers.filter((answer) => answer.parentQnaId === _id);

  return (
    <div key={_id}>
      <div css={TitleContainer}>
        <Badge count={answers.length}>
          <MessageOutlined />
        </Badge>
        <Link href={`/qna/${_id}`}>{title}</Link>
      </div>
      <div css={DescriptionContainer}>
        {texts.map((text, index) => (
          <span className="descriptions" key={index}>
            {text}
          </span>
        ))}
        <div>
          {tags.map((tag, idx) => {
            return <Tag key={`${_id} + ${idx}`}>{tag}</Tag>;
          })}
        </div>
        <div>
          <StarOutlined />
          <span>{`  ${recommends}명이 이 질문을 추천함.`}</span>
          <span>{`(${user.nickname}가 ${formattedDate}에 질문함)`}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
