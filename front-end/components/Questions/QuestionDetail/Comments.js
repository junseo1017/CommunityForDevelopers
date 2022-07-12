import { Avatar, Button, Comment, Form, Input, List } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const { TextArea } = Input;
import { MentionsInput, Mention } from "react-mentions";
import { useEffect } from "react";
import axios from "axios";

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

        const users = response.data.map((user) => user.nickname);
        setUserList(users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  console.log(userList);
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    setComments([...comments, comment]);
  };

  return (
    <div>
      {comments.map((comment) => (
        <div>{comment}</div>
      ))}
      <MentionsInput value={comment} onChange={handleChange} placeholder="댓글을 작성하세요.">
        <Mention trigger="@" data={userList} />
      </MentionsInput>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Comments;

export async function getServerSideProps() {}
