import React from "react";
import { Divider, List } from "antd";
import QuestionItem from "./QuestionItem";
import TopButton from "../TopButton";

const QuestionsList = ({ questions }) => {
  return (
    <div>
      <Divider plain />
      <List itemLayout="horizontal">
        {questions.map((questions, index) => {
          return (
            <QuestionItem
              qusetId={questions.qusetId}
              title={questions.title}
              description={questions.description}
              recommendations={questions.recommendations}
              tags={questions.tags}
              user={questions.user}
            />
          );
        })}
      </List>
      <TopButton />
    </div>
  );
};

export default QuestionsList;
