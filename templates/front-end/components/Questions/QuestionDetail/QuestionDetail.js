/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import TopButton from "../TopButton";
import { Button, Badge, Divider, Collapse, Input } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import {
  DetailContainer,
  DetailQuestionContainer,
  TextContainer,
  EditorContainer,
  DetailAnswerContainer,
} from "../styles/QuestionStyle";
import Link from "next/link";
import Editor from "../Editor/Editor";
import AddEditor from "../Editor/AddEditor";
import Output from "editorjs-react-renderer";
import axios from "axios";

const QuestionDetail = ({ qnaId }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [qna, setQna] = useState([]);

  useEffect(() => {
    const getQnaDataByQnaId = async () => {
      const response = await axios.get(`http://localhost:5000/api/qna/${qnaId}`);
      const result = response.data;
      setQna(result);
    };

    getQnaDataByQnaId();
  }, []);

  // qnaId로 조회하는 api
  // const question = dummy_qna.filter((qna) => qna.qnaId === qnaId);

  // parentQuestion === qnaId && isAnswer로 조회하는 api
  // 아니면 qnaId, parentQuestion이 url의 qnaId와 일치하는 글의 배열을 가져와서 작업
  // const answers = dummy_qna.filter((qna) => qna.isAnswer && qna.parentQuestion === qnaId);

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
        <Output data={JSON.parse(question[0].content)} />
        <Button size="large" type="primary" onClick={() => setIsEditMode(!isEditMode)}>
          답변하기
        </Button>
        {isEditMode && (
          <div css={EditorContainer}>
            <h2>답변하기</h2>
            <Input
              size="large"
              placeholder="답변의 제목을 작성하세요"
              onChange={(e) => console.log(e.target.value)}
            />
            <AddEditor />
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
                  <Badge count={answer.recommendations.length}>
                    <LikeOutlined style={{ fontSize: "2em" }} />
                  </Badge>
                </Button>
              </div>
              <Output data={JSON.parse(answer.content)} />
              <Editor data={JSON.parse(answer.content)} />
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
