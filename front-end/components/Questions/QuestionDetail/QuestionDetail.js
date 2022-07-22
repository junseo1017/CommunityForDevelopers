/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import TopButton from "../TopButton";
import { Button, Badge, Tag, Divider, Collapse, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  DetailContainer,
  DetailQuestionContainer,
  AnswerEditorContainer,
} from "../styles/QuestionStyle";
import AddEditor from "../Editor/AddEditor";
import Answers from "./Answers";
import Output from "editorjs-react-renderer";
import axios from "axios";
import moment from "moment";
import useConfirmModal from "../../../hooks/useConfirmModal";

const QuestionDetail = ({ qna }) => {
  const router = useRouter();

  // 질문 답변 분류
  const question = qna.Question;
  const answers = qna.Answers;
  console.log("qna", qna);
  console.log("question", question);
  console.log("answers", answers);

  // user 정보 가져오기
  const { me } = useSelector((state) => state.user);
  console.log("me", me);

  // 현재 로그인 유저가 질문자인지 확인
  const initialLoginState = me?._id === question.authorId;

  const [isAuthor, setIsAuthor] = useState(initialLoginState); // 수정, 삭제 버튼 보여주기
  const [isAnswerUpdateMode, setIsAnswerUpdateMode] = useState(false); // 답변 수정 form 변경
  const [isAnswerCreateMode, setIsAnswerCreateMode] = useState(false); // 답변 form 열기
  const [answerTitle, setAnswerTItle] = useState(""); // 답변 제목 저장

  // 질문 삭제
  const handleDelete = async (deleteId) => {
    try {
      await axios.delete(`/api/qnas/${deleteId}`);
      router.push(`/qna`);
    } catch (error) {
      console.log(error);
    }
  };

  // 질문 수정
  const handleUpdate = async () => {
    setIsAnswerUpdateMode(!isAnswerUpdateMode);
  };

  // 답변하기 form 오픈 시 스크롤
  const EditorRef = useRef();
  const handleScroll = () =>
    EditorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

  const redirectLogin = useCallback(() => {
    Router.push("/login");
  }, []);
  const redirectHome = useCallback(() => {
    Router.push("/");
  }, []);
  const modalMessage = useMemo(
    () => ({
      title: "로그인이 필요한 서비스입니다.",
      description: "로그인 하시겠습니까? 취소하면 홈으로 이동합니다.",
    }),
    [],
  );
  const [showConfirm] = useConfirmModal({
    okFunc: redirectLogin,
    cancleFunc: redirectHome,
    message: modalMessage,
  });

  return (
    <div css={DetailContainer}>
      <div css={DetailQuestionContainer}>
        {isAuthor && (
          <div className="button-wrapper">
            <button
              onClick={() => {
                handleUpdate();
              }}>
              수정하기
            </button>
            <button
              onClick={() => {
                handleDelete(question._id);
              }}>
              삭제하기
            </button>
          </div>
        )}
        <h1>{question.title}</h1>
        <div className="tag-container">
          {question.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
        <div className="info-container">
          <div className="info-box">
            <p>질문자: {question.author}</p>
            <p>질문일: {moment(question.createdAt).format("YYYY월 MM월 DD일")}</p>
            <p>최근 수정일: {moment(question.updatedAt).format("YYYY월 MM월 DD일")}</p>
          </div>
          <button
            onClick={() => {
              if (me === undefined) showConfirm();
              isAnswerCreateMode
                ? (EditorRef.current.style.display = "none")
                : (EditorRef.current.style.display = "flex");
              setIsAnswerCreateMode(!isAnswerCreateMode);
              handleScroll();
            }}>
            답변하기
          </button>
        </div>
      </div>
      <Divider plain />
      {!isAnswerUpdateMode ? (
        <Output data={JSON.parse(question.contents)} />
      ) : (
        <div className="answer-editor">
          <AddEditor
            data={JSON.parse(question.contents)}
            title={answerTitle}
            isAnswer={false}
            qnaId={question._id}
            isUpdate={true}
          />
        </div>
      )}
      <div ref={EditorRef} css={AnswerEditorContainer}>
        <h2>답변하기</h2>
        <Input
          size="large"
          placeholder="답변의 제목을 작성하세요"
          onChange={(e) => setAnswerTItle(e.target.value)}
        />
        <AddEditor title={answerTitle} isAnswer parentQnaId={question._id} />
      </div>
      <Answers answers={answers} />
      <TopButton />
    </div>
  );
};

export default QuestionDetail;
