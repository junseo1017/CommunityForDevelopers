/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Divider } from "antd";
import QuestionsList from "./QuestionsList";
import { SearchBarContainer, ColFlexBox } from "../styles/QuestionStyle";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import QuestionItem from "./QuestionItem";
import TopButton from "../TopButton";

const Questions = ({ questions, answers }) => {
  const [questionsList, setQuestionsList] = useState(questions); // 불러온 데이터
  // const [query, setQuery] = useState(""); // 검색어
  // const [searchQueryString, setSearchQueryString] = useState(""); // 검색어 기반 url
  // const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const lastId = questionsList[4]._id;
  //   setSearchQueryString(`value=${query}&lastId=${lastId}`);
  // }, [query, page]);

  // const getQnaData = useCallback(async () => {
  //   setIsLoading(true);
  //   const response = await axios.get(`/api/search/qnas?${searchQueryString}`);

  //   setQuestionsList((curr) => curr.concat(response.data));
  //   setIsLoading(false);
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
            console.log(searchQueryString);
          }}
        />
      </div>
      <Divider plain />
      <div css={ColFlexBox}>
        {questions.map((question) => {
          return (
            <div key={question._id}>
              <QuestionItem
                _id={question._id}
                title={question.title}
                recommends={question.recommends.length}
                contents={question.contents}
                tags={question.tags}
                user={question.author}
                date={question.createdAt}
                answers={answers}
              />
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
