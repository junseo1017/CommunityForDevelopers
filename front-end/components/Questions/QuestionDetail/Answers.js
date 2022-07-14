/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { TextContainer, DetailAnswerContainer } from "../styles/QuestionStyle";
import Answer from "./Answer";

const Answers = ({ answers, me }) => {
  return (
    <div>
      {answers.length === 0 && (
        <div css={TextContainer}>
          <h2>아직 답변이 없습니다. 당신의 지식을 공유해 보세요!</h2>
        </div>
      )}
      {answers &&
        answers.map((answer) => {
          return (
            <div css={DetailAnswerContainer} key={answer._id}>
              <Answer answer={answer} me={me} />
            </div>
          );
        })}
    </div>
  );
};

export default Answers;
