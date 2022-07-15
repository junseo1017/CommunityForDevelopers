/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { Button, Input, Divider } from "antd";
import QuestionsList from "./QuestionsList";
import { SearchBarContainer } from "../styles/QuestionStyle";
import Link from "next/link";

const Questions = ({ questions, answers }) => {
  const [query, setQuery] = useState("");
  const [questionsList, setQuestionsList] = useState([...questions]);

  const searchQuestions = () => {
    // e.preventDefault();

    if (query === null || query === "") {
      // 전체 데이터 목록
      setQuestionsList((curr) => [...curr, questions]);
    } else {
      // 검색
      const filteredQuestionList = questions.filter((question) => {
        const filteredBlocks = JSON.parse(question.contents).blocks.map(({ type, data }) => {
          return type === "paragraph" || type === "header" ? data : "";
        });

        const texts = filteredBlocks.map((block) => block.text).join(" ");

        return (
          question.title.toLowerCase().includes(query.toLowerCase()) ||
          texts.toLowerCase().includes(query.toLowerCase())
        );
      });
      setQuestionsList(filteredQuestionList);
    }
  };

  useEffect(() => {
    setQuestionsList(questions);
  }, [query]);

  return (
    <>
      <div css={SearchBarContainer}>
        <Input.Search
          placeholder="Search Questions"
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
        <Link href="/qna/new">
          <Button size="large" type="primary">
            질문하기
          </Button>
        </Link>
      </div>
      <Divider plain />
      {questions ? (
        <QuestionsList questions={questionsList} answers={answers} />
      ) : (
        <h1>아직 질문이 없습니다. 궁금한 질문을 남겨주세요.</h1>
      )}
    </>
  );
};

export default Questions;
