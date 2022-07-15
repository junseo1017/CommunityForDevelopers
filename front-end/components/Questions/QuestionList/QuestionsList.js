/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider } from "antd";
import QuestionItem from "./QuestionItem";
import TopButton from "../TopButton";
import { ColFlexBox } from "../styles/QuestionStyle";

const QuestionsList = ({ questions, answers }) => {
  return (
    <>
      <div css={ColFlexBox}>
        {questions.map((question) => {
          return (
            <div key={question._id}>
              <QuestionItem
                _id={question._id}
                title={question.title}
                recommends={question.recommends.length}
                contents={question.contents}
                tags={question.tags}
                user={question.author}
                date={question.createdAt}
                answers={answers}
              />
              <Divider plain />
            </div>
          );
        })}
      </div>
      <TopButton />
    </>
  );
};

export default QuestionsList;
