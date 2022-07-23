/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Divider } from "antd";
import { SearchBarContainer, ColFlexBox } from "../styles/QuestionStyle";
import axios, { Axios } from "axios";
import QuestionItem from "./QuestionItem";
import TopButton from "../TopButton";
import { throttle, debounce } from "lodash";

const Questions = ({ qnas }) => {
  const [questionsList, setQuestionsList] = useState([]); // 불러온 데이터
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(""); // 유저가 입력한 검색어

  const getQnaData = async (value, page) => {
    if (page === 1) {
      try {
        const response = await axios.get(`/api/search/qnas?value=${value}&page=${page}`);
        setQuestionsList([...response.data]);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.get(`/api/search/qnas?value=${value}&page=${page}`);
        setQuestionsList([...questionsList, ...response.data]);
        setLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getQnaData(value, page);
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

  const delaySetValue = useCallback(
    debounce((value) => {
      setValue(value);
      setPage(1);
      if (value?.length == 1) {
        alert("두 글자 이상이어야 합니다.");
      }
    }, 1000),
    [],
  );

  const handleInputChange = useCallback((e) => {
    delaySetValue(e.target.value);
  }, []);

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
              <QuestionItem question={question} />
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
