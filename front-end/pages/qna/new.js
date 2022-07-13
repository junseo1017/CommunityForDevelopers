/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Head from "next/head";
import { Input } from "antd";
import AppLayout from "../../components/AppLayout";
import AddEditor from "../../components/Questions/Editor/AddEditor";
import AddTags from "../../components/Questions/AddTag";
import { EditorContainer } from "../../components/Questions/styles/QuestionStyle";
import { useState } from "react";

const newQuestion = () => {
  // ! Input onChange 마다 렌더링 되고 있음. 개선 필수
  // console.log("rendering...");
  const [questionTitle, setQuestionTitle] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <AppLayout>
      <Head>
        <title>질문하기</title>
      </Head>
      <div css={EditorContainer}>
        <h1>질문하기</h1>
        <Input
          size="large"
          placeholder="질문의 제목을 작성하세요"
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
        <AddTags addTags={setTags} />
        <AddEditor title={questionTitle} isAnswer={false} parentQnaId={""} tags={tags} />
      </div>
    </AppLayout>
  );
};

export default newQuestion;
