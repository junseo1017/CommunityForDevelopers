/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { profileContentCardContainer, qnaContainer, qnaNavStyle } from "./styles/MyInfoStyles";
import ProfileQuestions from "./ProfileQuestions";
import ProfileAnswers from "./ProfileAnswers";
import { useSelector } from "react-redux";

const ProfileQnA = () => {
  const { qnabyUserId } = useSelector((state) => state.qna);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [select, setSelect] = useState(true);

  useEffect(() => {
    setQuestion(qnabyUserId.filter((e) => e.isAnswer === false));
    setAnswer(qnabyUserId.filter((e) => e.isAnswer === true));
  }, []);

  const onSelectHandler = useCallback((e) => {
    if (e.target.textContent === "질문") {
      setSelect(true);
    }
    if (e.target.textContent === "답변") {
      setSelect(false);
    }
  }, []);

  return (
    <Card css={profileContentCardContainer}>
      <article css={qnaContainer}>
        <nav onClick={onSelectHandler} css={qnaNavStyle}>
          <h3>질문</h3>
          <h3>답변</h3>
        </nav>
        {select ? <ProfileQuestions question={question} /> : <ProfileAnswers answer={answer} />}
      </article>
    </Card>
  );
};
export default ProfileQnA;
