import { Avatar, Button, Comment, Form, Input, List } from "antd";
import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { useEffect } from "react";
import axios from "axios";
import { CommentsContainer, CommentStyle } from "../styles/QuestionStyle";

const Comments = ({ contentId }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const users = response.data.map((user) => {
          return { id: user.userId, display: user.nickname };
        });

        setUserList(users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    setComments([...comments, comment]);
  };

  return (
    <div>
      {comments && (
        <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
          itemLayout="horizontal"
          renderItem={(comment) => <Comment css={CommentStyle}>{comment}</Comment>}
        />
      )}
      <MentionsInput value={comment} onChange={handleChange} placeholder="댓글을 작성하세요.">
        <Mention trigger="@" data={userList} markup="@__display__" />
      </MentionsInput>
      <Button type="primary" onClick={handleSubmit}>
        댓글 추가하기
      </Button>
    </div>
  );
};

export default Comments;

export async function getServerSideProps() {}
