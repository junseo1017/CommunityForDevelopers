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
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");

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
          onChange={(e) => setTitle(e.target.value)}
        />
        <AddTags />
        <AddEditor />
      </div>
    </AppLayout>
  );
};

export default newQuestion;
