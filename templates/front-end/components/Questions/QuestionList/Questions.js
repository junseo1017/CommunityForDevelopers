/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Divider, Result, Typography } from "antd";
import QuestionsList from "./QuestionsList";
import { FlexBox } from "../styles/QuestionStyle";
import Link from "next/link";

const Questions = ({ questions }) => {
  const [query, setQuery] = useState("");
  const [questionsList, setQuestionsList] = useState([]);

  const searchQuestions = () => {
    // e.preventDefault();

    if (query === null || query === "") {
      // 전체 데이터 목록 조회
      // const response = await axios.get("/api/questions");
      // ...
      // setQuestionsList((curr) => [...curr]);
      setQuestionsList((curr) => [...curr, questions]);
    } else {
      // 검색
      const filteredQuestionList = questions.filter((question) => {
        return (
          question.title.toLowerCase().includes(query) ||
          question.content.toLowerCase().includes(query)
        );
      });
      setQuestionsList(filteredQuestionList);

      // setQuestionsList((curr) => [...curr, filteredQuestionList]);
      // filteredQuestionList.length > 0
      //   ? setQuestionsList((curr) => [...curr, filteredQuestionList])
      //   : setQuestionsList(questions);
    }
  };

  useEffect(() => {
    // axios
    setQuestionsList(questions);
  }, [query]);

  return (
    <>
      <div css={FlexBox}>
        <Input.Search
          placeholder="input search text"
          allowClear
          enterButton
          size="large"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onSearch={() => {
            searchQuestions();
          }}
        />
        <Link href="/questions/new">
          <Button size="large" type="primary">
            질문하기
          </Button>
        </Link>
      </div>
      <Divider plain />
      <QuestionsList questions={questionsList} />
    </>
  );
};

export default Questions;
