import React, { useState, useEffect } from "react";
import Questions from "../../components/Questions/QuestionList/Questions";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";
import { dummy_qna } from "../../components/Questions/dummy";
import axios from "axios";

const questions = () => {
  // 더미데이터 활용
  const questions = dummy_qna.filter((qna) => !qna.isAnswer);

  const [qnas, setQnas] = useState([]);

  useEffect(() => {
    const getQnaData = async () => {
      const response = await axios.get("http://localhost:5000/api/qna");
      console.log("response", response);
      setQnas(response);
    };
    getQnaData();
  }, []);

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
