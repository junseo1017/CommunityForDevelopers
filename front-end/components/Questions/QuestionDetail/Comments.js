/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Avatar, Button, Comment, Form, Input, List } from "antd";
import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { CommentsContainer, CommentStyle } from "../styles/QuestionStyle";

const CommentsEditor = ({ comment, handleChange, userList, handleSubmit }) => {
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
          renderSuggestion={(suggestion, search, highlightedDisplay, index, focused) => (
            <div className={`user ${focused ? "focused" : ""}`}>{highlightedDisplay}</div>
          )}
          style={{ backgroundColor: "rgb(24, 144, 255, 0.25)" }}
        />
      </MentionsInput>
      <Button type="primary" onClick={handleSubmit}>
        댓글 추가하기
      </Button>
    </>
  );
};

const Comments = ({ contentId, user }) => {
  console.log(user);
  const [userList, setUserList] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  console.log(comments);

  useEffect(() => {
    const getCurrentComments = async () => {
      try {
        const response = await axios.get(`/api/qnas/${contentId}`);
        console.log("댓글", response);
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
    console.log(e.target.value);
  };

  const handleSubmit = async () => {
    comment.length > 0 ? setComments([...comments, comment]) : alert("댓글을 작성하세요.");
    try {
      await axios.post(
        `/api/comments/qna/${contentId}`,
        {
          content: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
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
          renderItem={(comment) => (
            <Comment
              author={<p>{user.nickname}</p>}
              avatar={<Avatar src={user.imgUrl} alt={userList.nickname} />}
              css={CommentStyle}
              content={<p>{comment.content || comment}</p>}
              datetime={<span>{moment().fromNow()}</span>}
            />
          )}
        />
      )}
      <Comment
        avatar={<Avatar src={user.imgUrl} alt={userList.nickname} />}
        content={
          <CommentsEditor
            comment={comment}
            handleChange={handleChange}
            userList={userList}
            handleSubmit={handleSubmit}
          />
        }
      />
    </div>
  );
};

export default Comments;

export async function getServerSideProps() {}
