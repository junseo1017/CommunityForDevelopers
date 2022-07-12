import React, { useState, useEffect } from "react";
import Questions from "../../components/Questions/QuestionList/Questions";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { qnaActions, getQnaData } from "../../reducers/qna";

const questions = ({ qnas }) => {
  // const dispatch = useDispatch();
  // const qnas = useSelector((state) => state.qnas);

  // useEffect(() => {
  //   dispatch(getQnaData());
  // }, [dispatch]);

  // console.log(qnas);

  const filterdQuestions = qnas.filter((qna) => !qna.isAnswer);

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

export async function getServerSideProps(context) {
  try {
    const response = await axios.get("/api/qnas");
    const qnas = response.data;

    return {
      props: {
        qnas,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
