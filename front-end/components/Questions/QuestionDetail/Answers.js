/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useSelector } from "react-redux";
import { Divider } from "antd";
import { TextContainer, DetailAnswerContainer } from "../styles/QuestionStyle";
import Answer from "./Answer";

const Answers = ({ answers }) => {
  const { me } = useSelector((state) => state.user);
  console.log("answers me", me);
  console.log("answers answers", answers);

  answers.sort((a, b) => {
    return b.recommends.length - a.recommends.length;
  });

  return (
    <div>
      {answers.length === 0 && (
        <div css={TextContainer}>
          <Divider plain />
          <h2>아직 답변이 없습니다. 당신의 지식을 공유해 보세요!</h2>
        </div>
      )}
      {answers &&
        answers.map((answer) => {
          return (
            <div css={DetailAnswerContainer} key={answer._id}>
              <Answer answer={answer} />
            </div>
          );
        })}
    </div>
  );
};

export default Answers;
