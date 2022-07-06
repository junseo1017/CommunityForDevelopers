import React from "react";

import { Segmented, Divider, List } from "antd";
import QuestionItem from "./QuestionItem";
import TopButton from "./TopButton";

const QuestionsList = ({ questions }) => {
  return (
    <div>
      <Divider plain />
      <List itemLayout="horizontal">
        {questions.map((questions, index) => {
          return (
            <QuestionItem
              index={index}
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
