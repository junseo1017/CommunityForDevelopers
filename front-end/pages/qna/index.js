import React from "react";
import Questions from "../../components/Questions/QuestionList/Questions";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { qnaActions, getQnaData } from "../../reducers/qna";

const questions = ({ questions, answers }) => {
  return (
    <AppLayout>
      <Head>
        <title>모든 질문</title>
      </Head>
      <Questions questions={questions} answers={answers} />
    </AppLayout>
  );
};

export default questions;

export async function getServerSideProps() {
  try {
    const response = await axios.get("/api/qnas");
    const qnas = response.data;
    const questions = qnas.filter((qna) => !qna.isAnswer);
    const answers = qnas.filter((qna) => qna.isAnswer);

    return {
      props: {
        questions,
        answers,
      },
    };
  } catch (error) {}
}
