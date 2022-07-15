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
    setQuestion(qnabyUserId.filter((e) => e.isAnswer === false));
    setAnswer(qnabyUserId.filter((e) => e.isAnswer === true));
  }, []);

  const onSelectHandler = (e) => {
    if (e.target.textContent === "질문") {
      console.log("q");
      setSelect(true);
    }
    if (e.target.textContent === "답변") {
      console.log("a");
      setSelect(false);
    }
    return;
  };

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
