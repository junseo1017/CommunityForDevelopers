/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import { Divider, Collapse } from "antd";
import { MessageOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DetailAnswerContainer } from "../styles/QuestionStyle";
import Like from "../Like";
import Output from "editorjs-react-renderer";
import AddEditor from "../Editor/AddEditor";
import axios from "axios";

const Answer = ({ answer }) => {
  const { me } = useSelector((state) => state.user);
  console.log("answer me", me);
  console.log("answer answer", answer);

  const [recommendData, setRecommendData] = useState({
    isRecommended: false,
    numberOfRecommends: 0,
  });

  const isRecommended = answer.recommends.map((user) => user._id).includes(me._id);
  const numberOfRecommends = answer.recommends.length;

  const initialLoginState = me._id === answer.authorId;

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/qnas/${answer._id}`);
        const qna = response.data;
        console.log("qna", qna);
        // Answer가 Answers에 추가되지 않음 -> 확인 불가능

        setRecommendData({ isRecommended, numberOfRecommends });
        setIsChanged(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [isChanged]);

  const [isAuthor, setIsAuthor] = useState(initialLoginState);
  const [isAnswerUpdateMode, setIsAnswerUpdateMode] = useState(false);

  // 답변 삭제하기
  const handleDelete = async (deleteId) => {
    try {
      await axios.delete(`/api/qnas/${deleteId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 답변 수정하기
  const handleUpdate = async () => {
    setIsAnswerUpdateMode(!isAnswerUpdateMode);
  };

  console.log("recommendData", recommendData);
  console.log("answer.comments", answer.comments);

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
      {/* {answer.recommends &&
        answer.recommends.map((user) => <div key={user._id}>{user.nickname}</div>)} */}
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
          <Comments currentComments={answer.comments} contentId={answer._id} user={me} />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Answer;
