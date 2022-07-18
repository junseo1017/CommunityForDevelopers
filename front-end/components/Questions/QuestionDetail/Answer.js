/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import { Divider, Collapse } from "antd";
import { MessageOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DetailAnswerContainer } from "../styles/QuestionStyle";
import Like from "../Like";
import Output from "editorjs-react-renderer";
import AddEditor from "../Editor/AddEditor";
import axios from "axios";

const Answer = ({ answer, me }) => {
  const [recommendData, setRecommendData] = useState({
    isRecommended: false,
    numberOfRecommends: 0,
  });

  const initialMode = !!(me._id === answer.author._id);

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

  const [isAuthor, setIsAuthor] = useState(initialMode);
  const [isAnswerUpdateMode, setIsAnswerUpdateMode] = useState(false);

  // 수정 삭제 작업 중..
  const handleDelete = async (deleteId) => {
    try {
      await axios.delete(`/api/qnas/${deleteId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    setIsAnswerUpdateMode(!isAnswerUpdateMode);
  };

  console.log("answerId :", answer._id);

  return (
    <div css={DetailAnswerContainer} key={answer._id}>
      <Divider plain />
      <div className="answer-title">
        <MessageOutlined style={{ fontSize: "2em" }} />
        <h2>{answer.title}</h2>
        <Like
          className="answer-like"
          qnaId={answer._id}
          recommendData={recommendData}
          setIsChanged={setIsChanged}
        />
        {isAuthor && (
          <div className="answer-mode">
            <EditOutlined
              style={{ fontSize: "2em" }}
              onClick={() => {
                handleUpdate();
              }}
            />
            <DeleteOutlined
              style={{ fontSize: "2em" }}
              onClick={() => {
                handleDelete(answer._id);
              }}
            />
          </div>
        )}
      </div>
      {!isAnswerUpdateMode ? (
        <Output data={JSON.parse(answer.contents)} />
      ) : (
        <AddEditor
          data={JSON.parse(answer.contents)}
          isAnswer={true}
          qnaId={answer._id}
          isUpdate={true}
        />
      )}
      <Collapse>
        <Collapse.Panel header="댓글 보기">
          <Comments contentId={answer._id} user={me} />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Answer;
