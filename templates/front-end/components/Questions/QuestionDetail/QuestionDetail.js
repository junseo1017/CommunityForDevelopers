/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
import Comments from "./Comments";
import TopButton from "../TopButton";
import { Button, Badge, Divider, Collapse } from "antd";
import { QuestionOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { FlexBox, ColFlexBox, CommentsContainer } from "../styles/QuestionStyle";

const dummy_answers = [
  {
    title: "Answer 1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in.",
    like: 7,
  },
  {
    title: "Answer 2",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in.",
    like: 11,
  },
  {
    title: "Answer 3",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in.",
    like: 0,
  },
];

const QuestionDetail = ({ questId }) => {
  const [isAnswered, setIsAnswered] = useState(true);

  if (dummy_answers.length === 0) {
    setIsAnswered(false);
  }

  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <div css={ColFlexBox}>
        <h1>Question Title({questId})</h1>
        <a href="/questions/new">
          <Button size="large" type="primary">
            다른 질문하기
          </Button>
        </a>
        <Divider plain />
      </div>

      <div css={ColFlexBox}>
        <div css={FlexBox}>
          <QuestionOutlined style={{ fontSize: "2em" }} />
          <h2>Question Description</h2>
        </div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur
          placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam
          assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quo molestiae quod quos consequuntur?
        </p>
        <Button size="large" type="primary" onClick={() => setIsAnswered(!isAnswered)}>
          답변하기
        </Button>
        <div>
          {!isAnswered && (
            <form>
              <label>답변 작성하기</label>
              <input />
            </form>
          )}
        </div>
        <Comments />
        <Divider plain />
      </div>
      {dummy_answers.map((answer) => {
        return (
          <div css={ColFlexBox}>
            <div css={FlexBox}>
              <MessageOutlined style={{ fontSize: "2em" }} />
              <h2>{answer.title}</h2>
            </div>
            <p>{answer.content}</p>
            <div css={FlexBox}>
              <Badge count={answer.like}>
                <LikeOutlined style={{ fontSize: "2em" }} />
              </Badge>
            </div>
            <Collapse>
              <Collapse.Panel header="댓글 보기">
                <Comments />
              </Collapse.Panel>
            </Collapse>
            <Divider plain />
          </div>
        );
      })}

      <Divider plain />
      <TopButton />
    </>
  );
};

export default QuestionDetail;
