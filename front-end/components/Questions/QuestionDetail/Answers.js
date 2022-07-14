/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { Divider, Collapse } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { TextContainer, DetailAnswerContainer } from "../styles/QuestionStyle";
import Like from "../Like";
import Output from "editorjs-react-renderer";

const Answers = ({ answers, userId, user }) => {
  console.log("answers", answers);
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
              <div className="answer-title">
                <MessageOutlined style={{ fontSize: "2em" }} />
                <h2>{answer.title}</h2>
                <Like qnaId={answer._id} userId={userId} />
              </div>
              <Output data={JSON.parse(answer.contents)} />
              <Collapse>
                <Collapse.Panel header="댓글 보기">
                  <Comments contentId={answer._id} user={user} />
                </Collapse.Panel>
              </Collapse>
              <Divider plain />
            </div>
          );
        })}
    </div>
  );
};

export default Answers;
