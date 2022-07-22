/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Divider } from "antd";
import { SearchBarContainer, ColFlexBox } from "../styles/QuestionStyle";
import axios, { Axios } from "axios";
import QuestionItem from "./QuestionItem";
import TopButton from "../TopButton";
import { throttle, debounce } from "lodash";

const Questions = ({ questions, answers }) => {
  const [questionsList, setQuestionsList] = useState([]); // 불러온 데이터
  console.log(questionsList);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(""); // 유저가 입력한 검색어

  console.log(value);

  const getQnaData = async (value, page = 1) => {
    if (value) {
      try {
        console.log(`/api/search/qnas?value=${value}&page=${page}`);
        const response = await axios.get(`/api/search/qnas?value=${value}&page=${page}`);
        console.log(response);
        setQuestionsList([...response.data]);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        console.log(`/api/search/qnas?value=${value}&page=${page}`);
        const response = await axios.get(`/api/search/qnas?value=${value}&page=${page}`);
        console.log(response);
        setQuestionsList([...questionsList, ...response.data]);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (value === "") {
      getQnaData(value, page);
    } else {
      getQnaData(value, page);
    }
  }, [page, value]);

  const loadMoreQnaData = () => setPage((prev) => prev + 1);

  const target = useRef();

  let limit = 1;
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          console.log(entries[0]);
          if (entries[0].isIntersecting) {
            limit++;
            loadMoreQnaData();
            if (limit >= 10) observer.unobserve(target.current);
          }
        },
        { threshold: 1 },
      );
      observer.observe(target.current);
    }
  }, [loading, limit]);

  // // 디바운싱 적용한 search query 가져오기
  const delaySetValue = useCallback(
    debounce((value) => {
      setValue(value);
      if (value?.length == 1) {
        alert("두 글자 이상이어야 합니다.");
      }
    }, 500),
    [],
  );

  const handleInputChange = useCallback((e) => {
    delaySetValue(e.target.value);
  }, []);

  // useEffect(() => {
  //   const makeQueryString = () => {
  //     const queryString = "";
  //     if (query) {
  //       queryString = `${query}`;
  //     }

  //     console.log(lastId);
  //     if (lastId) {
  //       queryString += `&lastId=${lastId}`;
  //     }

  //     return queryString;
  //   };
  //   setSearchQueryString(makeQueryString());
  // }, [query, lastId, searchQueryString]);

  // console.log(searchQueryString);
  // const loadMoreQnaData = async (searchQueryString) => {
  //   console.log(searchQueryString);
  //   try {
  //     console.log(searchQueryString);
  //     const response = await axios.get(`/api/search/qnas?value=${searchQueryString}`);
  //     console.log(response);
  //     console.log("Fetch Data", response.data);
  //     setQuestionsList(
  //       questionsList.concat(response.data.filter((question) => !question.isAnswer)),
  //     );
  //     setPage(page + 1);

  //     if (questionsList.length < page * 8 - 1) {
  //       setLastId(questionsList[questionsList.length - 1]._id);
  //     } else if (questionsList.length === page * 8) {
  //       setLastId(questionsList[page * 8 - 1]._id);
  //     }
  //     console.log(page);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     console.log("Scroll");
  //     // console.log(searchQueryString);
  //     if (
  //       window.innerHeight + e.target.documentElement.scrollTop + 1 >=
  //       e.target.documentElement.scrollHeight
  //     ) {
  //       loadMoreQnaData(searchQueryString);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [query, searchQueryString]);

  return (
    <>
      <div css={SearchBarContainer}>
        <input
          type="text"
          autoComplete="false"
          placeholder="검색어를 입력하세요"
          aria-label="search"
          onChange={handleInputChange}
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
      <div ref={target} onClick={() => loadMoreQnaData()}>
        Load More
      </div>
      <TopButton />
    </>
  );
};

export default Questions;
