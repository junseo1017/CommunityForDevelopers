/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import moment from "moment";
import { Badge, Tag } from "antd";
import { MessageOutlined, StarOutlined } from "@ant-design/icons";
import { TitleContainer, DescriptionContainer } from "../styles/QuestionStyle";
import Link from "next/link";

const QuestionItem = ({ _id, title, recommends, contents, tags, user, date, answers }) => {
  const formattedDate = moment(date).format("YYYY월 MM월 DD일");

  const parsedContents = JSON.parse(contents);

  const filteredBlocks =
    parsedContents &&
    parsedContents.blocks.map(({ type, data }) => {
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
        <div className="tag-container">
          <div>
            {tags.map((tag, idx) => {
              return <Tag key={`${_id} + ${idx}`}>{tag}</Tag>;
            })}
          </div>
          <span>{`(${user.nickname}이/가 ${formattedDate}에 질문함)`}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
