/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { profileContentCardContainer, qnaContainer, qnaNavStyle } from "./styles/MyInfoStyles";
import ProfileQuestions from "./ProfileQuestions";
import ProfileAnswers from "./ProfileAnswers";
const ProfileQnA = ({ qnabyUserId }) => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [select, setSelect] = useState(true);

  useEffect(() => {
    console.log(qnabyUserId);
    setQuestion(qnabyUserId.filter((e) => e.isAnswer === false));
    setAnswer(qnabyUserId.filter((e) => e.isAnswer === true));
  }, []);

  const onSelectHandler = (e) => {
    if (e.target.textContent === "질문") {
      setSelect(true);
    }
    if (e.target.textContent === "답변") {
      setSelect(false);
    }
  };

  console.log(question);
  return (
    <Card css={profileContentCardContainer}>
      <article css={qnaContainer}>
        <nav css={qnaNavStyle}>
          <h3 onClick={onSelectHandler}>질문</h3>
          <h3 onClick={onSelectHandler}>답변</h3>
        </nav>
        {select ? <ProfileQuestions question={question} /> : <ProfileAnswers answer={answer} />}
      </article>
    </Card>
  );
};
export default ProfileQnA;
