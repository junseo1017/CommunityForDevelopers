/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { Badge, Tag } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { TitleContainer, DescriptionContainer } from "../styles/QuestionStyle";
import Link from "next/link";
import dynamic from "next/dynamic";
// import Output from "editorjs-react-renderer";
const Output = dynamic(() => import("editorjs-react-renderer"), { ssr: false });

const QuestionItem = ({ qnaId, title, recommends, tags, user, date }) => {
  const formattedDate = `${new Date(date).getFullYear()}년 ${
    new Date(date).getMonth() + 1
  }월 ${new Date(date).getDate()}일`;

  return (
    <div key={qnaId}>
      <div css={TitleContainer}>
        <Badge count={recommends}>
          <MessageOutlined />
        </Badge>
        <Link href={`/qna/${qnaId}`}>{title}</Link>
      </div>
      <div css={DescriptionContainer}>
        {/* <Output data={JSON.parse(contents)} /> */}
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
