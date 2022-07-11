/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Badge, Tag } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { TitleContainer, DescriptionContainer } from "../styles/QuestionStyle";
import Link from "next/link";

const QuestionItem = ({ qnaId, title, content, recommendations, tags, user, date }) => {
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <div key={qnaId}>
      <div css={TitleContainer}>
        <Badge count={recommendations}>
          <MessageOutlined />
        </Badge>
        <Link href={`/questions/${qnaId}`}>{title}</Link>
      </div>
      <div css={DescriptionContainer}>
        {/* <div>{content}</div> */}
        <div>
          {tags.map((tag, idx) => {
            return <Tag key={`${qnaId} + ${idx}`}>{tag}</Tag>;
          })}
        </div>
        <div>{`(${user}가 ${formattedDate}에 질문함)`}</div>
      </div>
    </div>
  );
};

export default QuestionItem;
