import React, { useState, useEffect } from "react";
import Questions from "../../components/Questions/QuestionList/Questions";
import AppLayout from "../../components/AppLayout";
import Head from "next/head";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { qnaActions, getQnaData } from "../../reducers/qna";

const questions = ({ result }) => {
  // const [qnas, setQnas] = useState([]);
  console.log("inner result", result); // 찍힘

  const dispatch = useDispatch();
  const qnas = useSelector((state) => state.qnas);

  useEffect(() => {
    dispatch(qnaActions.getQnaData());
  }, [dispatch]);

  useEffect(() => {
    setQnas(result);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>모든 질문</title>
      </Head>
      <Questions questions={qnas} />
    </AppLayout>
  );
};

export default questions;

// export const getServerSideProps = async () => {
//   const response = await axios.get("http://localhost:5000/api/qnas");
//   // console.log("response", response); // 찍힘
//   const result = response.data;
//   console.log("result", result); // 찍힘

//   return {
//     props: {
//       result,
//     },
//   };
// };
