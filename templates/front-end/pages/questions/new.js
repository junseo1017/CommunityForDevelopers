/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import AddEditor from "../../components/Questions/Editor/AddEditor";
import { EditorContainer } from "../../components/Questions/styles/QuestionStyle";

const newQuestion = () => {
  return (
    <AppLayout>
      <Head>
        <title>질문하기</title>
      </Head>
      <div css={EditorContainer}>
        <h1>질문하기</h1>
        <AddEditor />
      </div>
    </AppLayout>
  );
};

export default newQuestion;
