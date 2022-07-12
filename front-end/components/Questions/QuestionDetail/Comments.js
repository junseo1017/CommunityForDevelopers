import { Avatar, Button, Comment, Form, Input, List } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const { TextArea } = Input;
import { MentionsInput, Mention } from "react-mentions";

const Comments = ({ users, contentId }) => {
  console.log(users);

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
      {comments.map((comment) => (
        <div>{comment}</div>
      ))}
      <MentionsInput value={comment} onChange={handleChange} placeholder="댓글을 작성하세요.">
        <Mention trigger="@" data={users} />
      </MentionsInput>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default Comments;

export async function getServerSideProps() {
  try {
    const response = await axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);

    const users = response;

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
