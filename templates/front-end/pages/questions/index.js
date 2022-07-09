import React from "react";
import Questions from "../../components/Questions/QuestionList/Questions";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";
import { dummy_qna } from "../../components/Questions/dummy";

const questions = () => {
  const questions = dummy_qna.filter((qna) => !qna.isAnswer);

  return (
    <AppLayout>
      <Head>
        <title>모든 질문</title>
      </Head>
      <Questions questions={questions} />
    </AppLayout>
  );
};

export default questions;
