/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
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
} from "../styles/QuestionStyle";
import Link from "next/link";
import AddEditor from "../Editor/AddEditor";
import Output from "editorjs-react-renderer";
// const Output = dynamic(async () => await import("editorjs-react-renderer"), { ssr: false });

const QuestionDetail = ({ qna, answers, users }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [answerTitle, setAnswerTItle] = useState("");

  const formattingDate = (date) => {
    return `${new Date(date).getFullYear()}년 ${new Date(date).getMonth() + 1}월 ${new Date(
      date,
    ).getDate()}일`;
  };

  return (
    <div css={DetailContainer}>
      <div css={DetailQuestionContainer}>
        <div>
          <Badge count={qna.recommends.length}>
            <LikeOutlined style={{ fontSize: "2em" }} />
          </Badge>
        </div>
        <h1>{qna.title}</h1>
        <div className="tag-container">
          {qna.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
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
            <AddEditor title={answerTitle} isAnswer parentQnaId={qna.qnaId} />
          </div>
        )}
        <div></div>
      </div>
      <Divider plain />
      {answers.length === 0 && (
        <div css={TextContainer}>
          <h2>아직 답변이 없습니다. 당신의 지식을 공유해 보세요!</h2>
        </div>
      )}
      {answers &&
        answers.map((answer) => {
          return (
            <div css={DetailAnswerContainer} key={answer.qnaId}>
              <div className="answer-title">
                <MessageOutlined style={{ fontSize: "2em" }} />
                <h2>{answer.title}</h2>
                <Button type="text">
                  <Badge count={answer.recommends.length}>
                    <LikeOutlined style={{ fontSize: "2em" }} />
                  </Badge>
                </Button>
              </div>
              <Output data={JSON.parse(answer.contents)} />
              <Collapse>
                <Collapse.Panel header="댓글 보기">
                  <Comments contentId={answer.qnaId} />
                </Collapse.Panel>
              </Collapse>
              <Divider plain />
            </div>
          );
        })}
      <TopButton />
    </div>
  );
};

export default QuestionDetail;
