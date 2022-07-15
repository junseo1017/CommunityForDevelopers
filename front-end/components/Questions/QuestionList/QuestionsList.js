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
            <div key={questions._id}>
              <QuestionItem
                _id={questions._id}
                title={questions.title}
                recommends={questions.recommends.length}
                tags={questions.tags}
                user={questions.userId}
                date={questions.createdAt}
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
