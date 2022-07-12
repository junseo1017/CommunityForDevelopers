import React, { useState, useEffect } from "react";
import Questions from "../../components/Questions/QuestionList/Questions";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { qnaActions, getQnaData } from "../../reducers/qna";

const questions = ({ qnas }) => {
  const [filterdQuestions, setFilterdQuestions] = useState([]);

  useEffect(() => {
    if (!qnas) {
      setFilterdQuestions(qnas.filter((qna) => !qna.isAnswer));
    }
  }, [qnas]);

  return (
    <AppLayout>
      <Head>
        <title>모든 질문</title>
      </Head>
      <Questions questions={filterdQuestions} />
    </AppLayout>
  );
};

export default questions;

export async function getServerSideProps() {
  try {
    const response = await axios.get("/api/qnas");
    console.log(response, `color: ${"#FF0000"}`);

    if (!response) {
      return {
        notFound: true,
      };
    }

    const qnas = response.data;

    return {
      props: {
        qnas,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
