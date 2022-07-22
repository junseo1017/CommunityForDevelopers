/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comments from "./Comments";
import { Divider, Collapse, Modal } from "antd";
import { MessageOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DetailAnswerContainer } from "../styles/QuestionStyle";
import Like from "../Like";
import Output from "editorjs-react-renderer";
import AddEditor from "../Editor/AddEditor";
import axios from "axios";

const Answer = ({ answer }) => {
  const { me } = useSelector((state) => state.user);

  const [recommendData, setRecommendData] = useState({
    isRecommended: false,
    numberOfRecommends: 0,
  });

  const isRecommended = answer.recommends.map((user) => user._id).includes(me._id);
  const numberOfRecommends = answer.recommends.length;

  const initialLoginState = me._id === answer.authorId;

  const [isChanged, setIsChanged] = useState(false);
  const [deleteId, setDeleteId] = useState("");

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
  const handleDelete = (id) => {
    setVisible(true);
    setDeleteId(id);
  };

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("삭제하면 다시 복구할 수 없습니다.");

  const handleOk = async () => {
    setModalText("답변을 삭제하겠습니다.");
    setConfirmLoading(true);
    try {
      const response = await axios.delete(`/api/qnas/${deleteId}`);
      console.log("이승기 - 삭제", response);
      setConfirmLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  // 답변 수정하기
  const handleUpdate = async () => {
    setIsAnswerUpdateMode(!isAnswerUpdateMode);
  };

  return (
    <div css={DetailAnswerContainer} key={answer._id}>
      <Divider plain />
      <Modal
        title="답변을 삭제하시겠습니까?"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
      <div className="answer-title">
        <Like
          className="answer-like"
          qnaId={answer._id}
          recommendData={recommendData}
          setIsChanged={setIsChanged}
        />
        <h2>{answer.title}</h2>
        {isAuthor && (
          <div className="button-wrapper">
            <button
              onClick={() => {
                handleUpdate();
              }}>
              수정
            </button>
            <button
              onClick={() => {
                handleDelete(answer._id);
              }}>
              삭제
            </button>
          </div>
        )}
      </div>
      {!isAnswerUpdateMode ? (
        <Output data={JSON.parse(answer.contents)} />
      ) : (
        <AddEditor data={answer.contents} isAnswer={true} qnaId={answer._id} isUpdate={true} />
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
