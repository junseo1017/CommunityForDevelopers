import React from "react";
import Questions from "../../components/Questions/QuestionList/Questions";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";
import { dummy_qna } from "../../components/Questions/dummy";

const questions = () => {
  return (
    <AppLayout>
      <Head>
        <title>모든 질문</title>
      </Head>
      <Questions questions={dummy_qna} />
    </AppLayout>
  );
};

export default questions;
