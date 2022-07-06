import React from "react";
import TopButton from "../TopButton";
import { Row, Col, Button, Badge, Divider } from "antd";
import { QuestionOutlined, StarOutlined, CommentOutlined } from "@ant-design/icons";

const dummy_answers = [
  {
    title: "Answer 1",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in.",
    recommendations: 7,
  },
  {
    title: "Answer 2",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in.",
    recommendations: 11,
  },
  {
    title: "Answer 3",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in.",
    recommendations: 0,
  },
];

const QuestionDetail = ({ questId }) => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col>
          <h1>Question Title({questId})</h1>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <a href="/">
            <Button size="large" type="primary">
              질문하기
            </Button>
          </a>
        </Col>
      </Row>
      <Divider plain />
      <Row justify="center" align="middle">
        <Col span={16}>
          <QuestionOutlined style={{ fontSize: "2em" }} />
          <h2>"Question Description"</h2>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis impedit, illum tenetur
          placeat excepturi tempore qui corrupti eaque deleniti quae libero similique. Harum numquam
          assumenda eaque? Culpa quibusdam veritatis a. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Quo molestiae quod quos consequuntur? Odio soluta, fugiat sint facilis
          aperiam, illum nisi reprehenderit, nemo aliquam quibusdam eum ipsa accusamus voluptates
          accusantium. Sunt numquam repudiandae esse fugit, quisquam dolorum voluptate libero eaque
          optio officia est, nemo molestias aliquid! Tempore deserunt ipsum maiores laborum magni
          odit incidunt deleniti! Officia repudiandae facilis corrupti itaque! Consequatur placeat
          unde distinctio officia ducimus dignissimos odit exercitationem. Saepe eius aspernatur
          consequuntur nostrum. Maxime corporis ipsam voluptates debitis aspernatur, praesentium
          architecto expedita sed itaque unde corrupti dignissimos voluptatibus nostrum! Laboriosam
          amet fugit sint quos quasi. Voluptatum quos optio blanditiis sequi, nostrum culpa
          voluptatem consectetur. Doloribus illum fuga provident similique dicta autem in.
        </Col>
      </Row>
      <Divider plain />
      <Row justify="center" align="middle">
        <Col span={16}>
          <Badge count={dummy_answers[0].recommendations}>
            <StarOutlined style={{ fontSize: "2em" }} />
          </Badge>
          <h2>{dummy_answers[0].title}</h2>
          <p>{dummy_answers[0].content}</p>
        </Col>
      </Row>
      <Divider plain />
      <Row justify="center" align="middle">
        <Col span={16}>
          <Badge count={dummy_answers[1].recommendations}>
            <StarOutlined style={{ fontSize: "2em" }} />
          </Badge>
          <h2>{dummy_answers[1].title}</h2>
          <p>{dummy_answers[1].content}</p>
        </Col>
      </Row>
      <Divider plain />
      <Row justify="center" align="middle">
        <Col span={16}></Col>
      </Row>
      <Divider plain />
      <Row justify="center" align="middle">
        <Col span={16}>
          {/* Comments Component */}
          <CommentOutlined style={{ fontSize: "2em" }} />
          <h2>"Comment 1"</h2>
          Rerum placeat esse nemo odio cum repellat. Nesciunt eius officia numquam quidem a sit
          ipsum explicabo doloribus saepe sint accusamus enim similique id, voluptas pariatur soluta
          eum doloremque laudantium dicta esse quae? Ratione impedit minima tempore nam. Nisi
          consequuntur commodi quae alias delectus ipsum sit molestias quaerat ea molestiae. Facilis
          vel libero ab blanditiis nam natus quo recusandae soluta veritatis laboriosam!
        </Col>
      </Row>
      <Divider plain />
      <TopButton />
    </>
  );
};

export default QuestionDetail;
