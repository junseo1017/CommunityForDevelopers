/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Avatar, Button, Comment, Form, Input, List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MentionsInput, Mention } from "react-mentions";
import { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { CommentsContainer, CommentStyle } from "../styles/QuestionStyle";

const Comments = ({ contentId, user }) => {
  const CommentsEditor = ({ comment, handleChange, userList, handleSubmit, isUpdate }) => {
    return (
      <>
        <MentionsInput
          className="mentions-input"
          value={comment}
          onChange={handleChange}
          placeholder="댓글을 작성하세요."
          a11ySuggestionsListLabel={"Suggested mentions"}>
          <Mention
            className="mentions"
            markup="@__display__"
            trigger="@"
            data={userList}
            value={comment}
            renderSuggestion={(highlightedDisplay, focused) => (
              <div className={`user ${focused ? "focused" : ""}`}>{highlightedDisplay}</div>
            )}
            style={{ backgroundColor: "rgb(24, 144, 255, 0.25)" }}
          />
        </MentionsInput>
        <Button type="primary" onClick={handleSubmit}>
          {!isUpdate ? "댓글 추가하기" : "댓글 수정하기"}
        </Button>
      </>
    );
  };

  const { me } = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [isUpdateMode, setIsUpdateMode] = useState({
    isUpdate: false,
    updateId: "",
  });

  // 수정 삭제 작업 중..
  const handleDelete = async (deleteId) => {
    try {
      await axios.delete(`api/comments/${deleteId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (commentId) => {
    setIsUpdateMode((current) => {
      return {
        ...current,
        isUpdate: !current.isUpdate,
        updateId: commentId,
      };
    });
  };

  useEffect(() => {
    const getCurrentComments = async () => {
      try {
        const response = await axios.get(`/api/qnas/${contentId}`);
        setComments(response.data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentComments();
  }, []);

  useEffect(() => {
    // 유저 전체 리스트 조회해 멘션 기능 활성화하기
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/users");

        // 데이터 변환
        const users = response.data.map((user) => {
          return { id: user._id, display: user.nickname };
        });

        setUserList(users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleCreateSubmit = async () => {
    comment.length > 0 ? setComments([...comments, comment]) : alert("댓글을 작성하세요.");
    try {
      await axios.post(`/api/comments/qna/${contentId}`, {
        content: comment,
      });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async () => {
    comment.length > 0 ? setComments([...comments, comment]) : alert("댓글을 작성하세요.");
    try {
      const res = await axios.put(`/api/comments/${contentId}`, {
        content: comment,
      });
      console.log(res);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div css={CommentsContainer}>
      {comments && (
        <List
          dataSource={comments}
          header={`${comments.length}${comments.length > 1 ? "개의 댓글들" : "개의 댓글"}`}
          itemLayout="horizontal"
          renderItem={(comment) => {
            return !isUpdateMode.isUpdate && isUpdateMode.updateId === comment._id ? (
              <Comment
                avatar={<Avatar src={user.imgUrl} alt={userList.nickname} />}
                content={
                  <CommentsEditor
                    comment={comment.content}
                    handleChange={handleChange}
                    userList={userList}
                    handleSubmit={handleUpdateSubmit}
                    isUpdate
                  />
                }
              />
            ) : (
              <div className="comment-container">
                <Comment
                  author={<p>{user.nickname}</p>}
                  avatar={<Avatar src={user.imgUrl} alt={userList.nickname} />}
                  css={CommentStyle}
                  content={<p>{comment.content || comment.author}</p>}
                  datetime={<span>{moment(comment.createdAt).fromNow()}</span>}
                />
                {me._id === comment.author?._id && (
                  <div className="comment-mode">
                    <EditOutlined
                      onClick={() => {
                        handleUpdate(comment._id);
                      }}
                    />
                    <DeleteOutlined
                      onClick={() => {
                        handleDelete(comment._id);
                      }}
                    />
                  </div>
                )}
              </div>
            );
          }}
        />
      )}
      <Comment
        avatar={<Avatar src={user.imgUrl} alt={userList.nickname} />}
        content={
          <CommentsEditor
            comment={comment}
            handleChange={handleChange}
            userList={userList}
            handleSubmit={handleCreateSubmit}
          />
        }
      />
    </div>
  );
};

export default Comments;
