/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Divider } from "antd";
import { SearchBarContainer, ColFlexBox } from "../styles/QuestionStyle";
import axios, { Axios } from "axios";
import { useInView } from "react-intersection-observer";
import QuestionItem from "./QuestionItem";
import TopButton from "../TopButton";
import throttle from "lodash";

const Questions = ({ questions, answers }) => {
  const [questionsList, setQuestionsList] = useState(questions); // 불러온 데이터
  console.log("questionsList", questionsList);
  const [query, setQuery] = useState(""); // 유저가 입력한 검색어
  const [searchQueryString, setSearchQueryString] = useState(""); // 검색어 기반 url
  let page = 1;
  let lastId = questionsList[page * 8 - 1]._id;
  console.log("lastId", lastId);

  const loadMoreQnaData = async () => {
    try {
      const response = await axios.get(`/api/search/qnas?value=&lastId=${lastId}`);
      console.log(response);
      console.log("Fetch Data", response.data);
      setQuestionsList(questionsList.concat(response.data));
      page += 1;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      (e) => {
        console.log("Scroll");
        if (
          window.innerHeight + e.target.documentElement.scrollTop + 1 >=
          e.target.documentElement.scrollHeight
        ) {
          loadMoreQnaData();
        }
      };
    }, 300);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        {questionsList.map((question) => {
          return (
            <div key={question._id}>
              <QuestionItem
                question={question}
                answers={answers.filter((answer) => answer.parentQnaId === question._id)}
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
