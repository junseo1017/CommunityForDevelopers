/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import Comments from "./Comments";
import TopButton from "../TopButton";
import { Button, Badge, Tag, Divider, Collapse, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DetailContainer, DetailQuestionContainer, EditorContainer } from "../styles/QuestionStyle";
import Link from "next/link";
import AddEditor from "../Editor/AddEditor";
import Like from "../Like";
import Answers from "./Answers";
import Output from "editorjs-react-renderer";
import axios from "axios";
import moment from "moment";

const QuestionDetail = ({ qna }) => {
  // 질문 답변 분류
  const question = qna.Question;
  const answers = qna.Answers;
  console.log("qna", qna);
  console.log("question", question);
  console.log("answers", answers);

  // qna의 id 가져오기
  const router = useRouter();
  const qnaId = router.query._id;

  // user 정보 가져오기
  const { me } = useSelector((state) => state.user);
  console.log("me", me);

  const initialState = !!(me._id === question.author._id);

  const [isAnswerCreateMode, setIsAnswerCreateMode] = useState(initialState);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isAnswerUpdateMode, setIsAnswerUpdateMode] = useState(false);

  // 수정 삭제 작업 중..
  const handleDelete = async (deleteId) => {
    try {
      await axios.delete(`/api/qnas/${deleteId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    setIsAnswerUpdateMode(!isAnswerUpdateMode);
  };

  const [answerTitle, setAnswerTItle] = useState("");

  const [recommendData, setRecommendData] = useState({
    isRecommended: false,
    numberOfRecommends: 0,
  });

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

  const EditorRef = useRef();
  console.log("EditorRef", EditorRef);

  const handleScroll = () => EditorRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div css={DetailContainer}>
      <div css={DetailQuestionContainer}>
        {/* <Like qnaId={question._id} recommendData={recommendData} setIsChanged={setIsChanged} /> */}
        <h1>{question.title}</h1>
        {isAuthor && (
          <div>
            <EditOutlined
              style={{ fontSize: "2em" }}
              onClick={() => {
                handleUpdate();
              }}
            />
            <DeleteOutlined
              style={{ fontSize: "2em" }}
              onClick={() => {
                handleDelete(question._id);
                router.replace(`/qna/${router.query._id}`);
              }}
            />
          </div>
        )}
        <div className="tag-container">
          {question.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
          <p>질문자: {question.author.nickname}</p>
          <p>질문일: {moment(question.createdAt).format("YYYY월 MM월 DD일")}</p>
          <p>최근 수정일: {moment(question.updatedAt).format("YYYY월 MM월 DD일")}</p>
        </div>
        <div>
          {/* <Link href="/qna">
            <Button size="large" type="text">
              목록으로 가기
            </Button>
          </Link>
          <Link href="/qna/new">
            <Button size="large" type="primary">
              다른 질문하기
            </Button>
          </Link> */}
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setIsAnswerCreateMode(!isAnswerCreateMode);
              isAnswerCreateMode
                ? (EditorRef.current.style.display = "none")
                : (EditorRef.current.style.display = "flex");
              handleScroll();
            }}>
            답변하기
          </Button>
        </div>
        <Divider plain />
        {!isAnswerUpdateMode ? (
          <Output data={JSON.parse(question.contents)} />
        ) : (
          <AddEditor
            data={JSON.parse(question.contents)}
            title={answerTitle}
            isAnswer={false}
            qnaId={question._id}
            isUpdate={true}
          />
        )}
        <div ref={EditorRef} css={EditorContainer}>
          <h2>답변하기</h2>
          <Input
            size="large"
            placeholder="답변의 제목을 작성하세요"
            onChange={(e) => setAnswerTItle(e.target.value)}
          />
          <AddEditor title={answerTitle} isAnswer parentQnaId={question._id} />
        </div>
      </div>
      <Answers answers={answers} me={me ? me : null} />
      <TopButton />
    </div>
  );
};

export default QuestionDetail;
