import { Avatar, Button, Comment, Form, Input, List } from "antd";
import moment from "moment";
import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import useConfirmModal from "../../../hooks/useConfirmModal";
import { debounce } from "lodash";
import Router from "next/router";
import { CommentsContainer, CommentStyle } from "../styles/QuestionStyle";

const CommentList = ({ comments, me, handleDelete }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "개의 댓글들" : "개의 댓글"}`}
    itemLayout="horizontal"
    renderItem={(comment) => (
      <div className="comment-item">
        <Comment
          author={<a>{comment.author.nickname}</a>}
          avatar={
            <Avatar
              src={comment.author?.imgUrl || "/image/profile_image_default.jpg"}
              alt={comment.author?.nickname}
            />
          }
          content={
            <div>
              {me?._id === comment.author?._id && (
                <button
                  onClick={() => {
                    handleDelete(comment._id);
                  }}>
                  삭제
                </button>
              )}
              <p>{comment.content}</p>
            </div>
          }
          css={CommentStyle}
          datetime={<span>{moment(comment.createdAt).fromNow()}</span>}
        />
      </div>
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Comments = ({ contentId, currentComments }) => {
  console.log("currentComments", currentComments);
  // 로그인 여부 확인
  const { me } = useSelector((state) => state.user);

  const redirectLogin = useCallback(() => {
    Router.push("/login");
  }, []);

  const redirectHome = useCallback(() => {
    Router.push("/");
  }, []);

  const modalMessage = useMemo(
    () => ({
      title: "로그인이 필요한 서비스입니다.",
      description: "로그인 하시겠습니까? 취소하면 홈으로 이동합니다.",
    }),
    [],
  );

  const [showConfirm] = useConfirmModal({
    okFunc: redirectLogin,
    cancleFunc: redirectHome,
    message: modalMessage,
  });

  const [comments, setComments] = useState(currentComments);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    if (!value) return;
    if (me === undefined) {
      showConfirm();
      return;
    }

    setSubmitting(true);
    const response = await axios.post(`/api/comments/qna/${contentId}`, {
      content: value,
    });
    console.log("댓글 추가 response", response);
    setValue("");
    setComments([...comments, response.data]);
    setSubmitting(false);
  };

  // const handleChange = debounce((e) => {
  //   console.log(e.target.value);
  //   setValue(e.target.value);
  // }, 500);
  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`api/comments/${id}`);
      console.log(response);
      Router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div css={CommentsContainer}>
      {comments.length > 0 && (
        <CommentList comments={comments} me={me} handleDelete={handleDelete} />
      )}
      <Comment
        avatar={<Avatar src={me?.imgUrl || "/image/profile_image_default.jpg"} alt={me.nickname} />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
};

export default Comments;
