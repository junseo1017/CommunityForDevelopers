/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Divider } from "antd";
import { SearchBarContainer, ColFlexBox } from "../styles/QuestionStyle";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import QuestionItem from "./QuestionItem";
import TopButton from "../TopButton";

const Questions = ({ questions, answers }) => {
  const [questionsList, setQuestionsList] = useState(questions); // 불러온 데이터
  const [query, setQuery] = useState(""); // 유저가 입력한 검색어
  const [searchQueryString, setSearchQueryString] = useState(""); // 검색어 기반 url

  // const { ref, inView, entry } = useInView({
  //   threshold: 0,
  // });

  // if (inView) {
  //   console.log(inView);
  // }

  // useEffect(() => {
  //   if (inView) {
  //     setSearchQueryString(`value=${query}&lastId=${lastId}`);
  //     getQnaData();
  //   }
  // }, [inView]);

  // useEffect(() => {
  //   const onScroll = throttle(() => {
  //     if (query.length > 0) {
  //       if (
  //         window.scrollY + document.documentElement.clientHeight >
  //         document.documentElement.scrollHeight - 300
  //       ) {
  //         if (query) {
  //           await axios
  //         }
  //       }
  //     }
  //   });
  // }, []);

  // console.log("questionsList", questionsList);
  // const [lastId, setLastId] = useState(questionsList[questionsList.length - 1]?._id);
  // console.log("lastId", lastId);

  // useEffect(() => {
  //
  //   console.log(searchQueryString);
  // }, [query]);

  // const getQnaData = useCallback(async () => {
  //   // setIsLoading(true);
  //   const response = await axios.get(`/api/search/qnas?${searchQueryString}`);

  //   setQuestionsList(response.data);
  //   // setIsLoading(false);
  // });

  // useEffect(() => {
  //   getQnaData();
  // }, [getQnaData]);

  // useEffect(() => {
  //   // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
  //   if (inView && !isLoading) {
  //     setPage((prevState) => prevState + 1);
  //   }
  // }, [inView, isLoading]);

  return (
    <>
      <div css={SearchBarContainer}>
        <input
          type="text"
          autoComplete="false"
          placeholder="검색어를 입력하세요"
          aria-label="search"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <Divider plain />
      <div css={ColFlexBox}>
        {questions.map((question, idx) => {
          return (
            <div key={question._id}>
              {idx === questions.length - 1 ? (
                <QuestionItem
                  // ref={ref}
                  question={question}
                  answers={answers.filter((answer) => answer.parentQnaId === question._id)}
                />
              ) : (
                <QuestionItem
                  question={question}
                  answers={answers.filter((answer) => answer.parentQnaId === question._id)}
                />
              )}
              <Divider plain />
            </div>
          );
        })}
      </div>
      <TopButton />
    </>
  );
};

export default Questions;
