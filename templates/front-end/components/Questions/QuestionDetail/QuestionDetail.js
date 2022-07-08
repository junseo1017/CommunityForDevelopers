/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import TopButton from "../TopButton";
import { Button, Badge, Divider, Collapse } from "antd";
import { QuestionOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import {
  DetailContainer,
  DetailQuestionContainer,
  TextContainer,
  EditorContainer,
  DetailAnswerContainer,
  CollapseStyle,
} from "../styles/QuestionStyle";
import Link from "next/link";
import AddEditor from "../Editor/AddEditor";
import { dummy_qna } from "../dummy";

const QuestionDetail = ({ qnaId }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // qnaId로 조회하는 api
  const question = dummy_qna.filter((qna) => qna.qnaId === qnaId);

  // parentQuestion === qnaId && isAnswer로 조회하는 api
  // 아니면 qnaId, parentQuestion이 url의 qnaId와 일치하는 글의 배열을 가져와서 작업
  const answers = dummy_qna.filter((qna) => qna.isAnswer);

  return (
    <div css={DetailContainer}>
      <div css={DetailQuestionContainer}>
        <h1>{question[0].title}</h1>
        <div>
          <Link href="/questions">
            <Button size="large" type="text">
              목록으로 가기
            </Button>
          </Link>
          <Link href="/questions/new">
            <Button size="large" type="primary">
              다른 질문하기
            </Button>
          </Link>
        </div>
        <Divider plain />
        <p css={TextContainer}>{question[0].content}</p>
        <Button size="large" type="primary" onClick={() => setIsEditMode(!isEditMode)}>
          답변하기
        </Button>
        {isEditMode && (
          <div css={EditorContainer}>
            <h2>답변하기</h2>
            <AddEditor />
          </div>
        )}
        <div></div>
      </div>
      <Divider plain />
      {answers &&
        answers.map((answer) => {
          return (
            <div css={DetailAnswerContainer} key={answer.qnaId}>
              <div className="answer-title">
                <MessageOutlined style={{ fontSize: "2em" }} />
                <h2>{answer.title}</h2>
                <Button type="text">
                  <Badge count={answer.recommendations.length}>
                    <LikeOutlined style={{ fontSize: "2em" }} />
                  </Badge>
                </Button>
              </div>
              <p css={TextContainer}>{answer.content}</p>
              <Collapse>
                <Collapse.Panel header="댓글 보기">
                  <Comments />
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
