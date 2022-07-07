/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider } from "antd";
import QuestionItem from "./QuestionItem";
import TopButton from "../TopButton";
import { ColFlexBox } from "../styles/QuestionStyle";

const QuestionsList = ({ questions }) => {
  return (
    <>
      <div css={ColFlexBox}>
        {questions.map((questions) => {
          return (
            <>
              <QuestionItem
                qusetId={questions.qusetId}
                title={questions.title}
                description={questions.description}
                recommendations={questions.recommendations}
                numOfAnswers={questions.answers.length}
                tags={questions.tags}
                user={questions.user}
                date={questions.date}
              />
              <Divider plain />
            </>
          );
        })}
      </div>
      <TopButton />
    </>
  );
};

export default QuestionsList;
