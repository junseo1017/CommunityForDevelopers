/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import Comments from "./Comments";
import TopButton from "../TopButton";
import { Button, Badge, Tag, Divider, Collapse, Input } from "antd";
import { DetailContainer, DetailQuestionContainer, EditorContainer } from "../styles/QuestionStyle";
import Link from "next/link";
import AddEditor from "../Editor/AddEditor";
import Like from "../Like";
import Answers from "./Answers";
import Output from "editorjs-react-renderer";
import axios from "axios";

const QuestionDetail = ({ qna, answers }) => {
  // qna의 id 가져오기
  const router = useRouter();
  const qnaId = router.query._id;

  // user 정보 가져오기
  const { me } = useSelector((state) => state.user);

  const [isEditMode, setIsEditMode] = useState(false);
  const [answerTitle, setAnswerTItle] = useState("");

  const formattingDate = (date) => {
    return `${new Date(date).getFullYear()}년 ${new Date(date).getMonth() + 1}월 ${new Date(
      date,
    ).getDate()}일`;
  };

  const [recommendData, setRecommendData] = useState({
    isRecommended: false,
    numberOfRecommends: 0,
  });

  console.log(recommendData);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/qnas/${qnaId}`);
        const qna = response.data;

        const isRecommended = qna.recommends.map((user) => user._id).includes(me._id);
        const numberOfRecommends = qna.recommends.length;

        setRecommendData({ isRecommended, numberOfRecommends });
        setIsChanged(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [isChanged]);

  return (
    <div css={DetailContainer}>
      <div css={DetailQuestionContainer}>
        <Like qnaId={qna._id} recommendData={recommendData} setIsChanged={setIsChanged} />
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
      <Answers answers={answers} me={me} />
      <TopButton />
    </div>
  );
};

export default QuestionDetail;
