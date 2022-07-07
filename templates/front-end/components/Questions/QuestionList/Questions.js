import React from "react";
import { Button, Row, Col, Input, Segmented, Divider } from "antd";
import QuestionsList from "./QuestionsList";

const Questions = ({ questions }) => {
  return (
    <>
      <Row justify="center" align="middle">
        <Col>
          <h1>모든 질문({questions.length})</h1>
        </Col>
      </Row>
      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col span={16}>
          <Input.Search
            placeholder="input search text"
            allowClear
            enterButton
            size="large"
            onSearch={() => {}}
          />
        </Col>
        <Col>
          <a href="/">
            <Button size="large" type="primary">
              질문하기
            </Button>
          </a>
        </Col>
      </Row>
      <Divider plain />
      <Segmented
        options={["HTML/CSS", "JavaScript", "Node.js", "React.js", "Next.js", "Python", "Java"]}
      />
      <QuestionsList questions={questions} />
    </>
  );
};

export default Questions;
