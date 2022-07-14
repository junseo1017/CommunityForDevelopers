/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import Comments from "./Comments";
import TopButton from "../TopButton";
import { Button, Badge, Tag, Divider, Collapse, Input } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import {
  DetailContainer,
  DetailQuestionContainer,
  TextContainer,
  EditorContainer,
  DetailAnswerContainer,
  CommentsContainer,
} from "../styles/QuestionStyle";
import Link from "next/link";
import AddEditor from "../Editor/AddEditor";
import Like from "../Like";
import Answers from "./Answers";
import Output from "editorjs-react-renderer";

const QuestionDetail = ({ qna, answers }) => {
  const router = useRouter();
  const likeId = router.query._id;
  console.log("지금 보는 페이지", likeId);

  const [isEditMode, setIsEditMode] = useState(false);
  const [answerTitle, setAnswerTItle] = useState("");
  const formattingDate = (date) => {
    return `${new Date(date).getFullYear()}년 ${new Date(date).getMonth() + 1}월 ${new Date(
      date,
    ).getDate()}일`;
  };

  // 유저 id 가져오기
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo._id;
  console.log(userInfo);

  return (
    <div css={DetailContainer}>
      <div css={DetailQuestionContainer}>
        <Like qnaId={qna._id} userId={userId} />
        <h1>{qna.title}</h1>
        <div className="tag-container">
          {qna.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
          <p>질문자: {qna.author.nickname}</p>
          <p>질문일: {formattingDate(qna.createdAt)}</p>
          <p>최근 수정일: {formattingDate(qna.updatedAt)}</p>
        </div>
        <div>
          <Link href="/qna">
            <Button size="large" type="text">
              목록으로 가기
            </Button>
          </Link>
          <Link href="/qna/new">
            <Button size="large" type="primary">
              다른 질문하기
            </Button>
          </Link>
        </div>
        <Divider plain />
        <Output data={JSON.parse(qna.contents)} />
        <Button size="large" type="primary" onClick={() => setIsEditMode(!isEditMode)}>
          답변하기
        </Button>
        {isEditMode && (
          <div css={EditorContainer}>
            <h2>답변하기</h2>
            <Input
              size="large"
              placeholder="답변의 제목을 작성하세요"
              onChange={(e) => setAnswerTItle(e.target.value)}
            />
            <AddEditor title={answerTitle} isAnswer parentQnaId={qna._id} />
          </div>
        )}
        <div></div>
      </div>
      <Divider plain />
      <Answers answers={answers} userId={userId} user={userInfo} />
      <TopButton />
    </div>
  );
};

export default QuestionDetail;
