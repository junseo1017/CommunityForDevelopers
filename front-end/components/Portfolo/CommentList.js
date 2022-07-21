import { Comment, List, Avatar } from "antd";
import React from "react";
//<Link href={`/profile/${author?._id}`}></Link>

const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );
};

export default CommentList;
