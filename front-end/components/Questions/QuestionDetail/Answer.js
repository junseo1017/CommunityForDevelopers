/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { Divider, Collapse } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { DetailAnswerContainer } from "../styles/QuestionStyle";
import Like from "../Like";
import Output from "editorjs-react-renderer";
import axios from "axios";

const Answer = ({ answer, me }) => {
  const [recommendData, setRecommendData] = useState({
    isRecommended: false,
    numberOfRecommends: 0,
  });

  console.log(recommendData);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/qnas/${answer._id}`);
        const qna = response.data;

        const isRecommended = qna.recommends.map((user) => user._id).includes(me._id);
        const numberOfRecommends = qna.recommends.length;

        setRecommendData({ isRecommended, numberOfRecommends });
        setIsChanged(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [isChanged]);
  console.log("answers", answer);
  return (
    <div css={DetailAnswerContainer} key={answer._id}>
      <div className="answer-title">
        <MessageOutlined style={{ fontSize: "2em" }} />
        <h2>{answer.title}</h2>
        <Like qnaId={answer._id} recommendData={recommendData} setIsChanged={setIsChanged} />
      </div>
      <Output data={JSON.parse(answer.contents)} />
      <Collapse>
        <Collapse.Panel header="댓글 보기">
          <Comments contentId={answer._id} user={me} />
        </Collapse.Panel>
      </Collapse>
      <Divider plain />
    </div>
  );
};

export default Answer;
