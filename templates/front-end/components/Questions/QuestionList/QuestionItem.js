import React from "react";
import { List, Badge, Tag } from "antd";
import { LikeOutlined } from "@ant-design/icons";

const QuestionItem = ({ qusetId, title, description, recommendations, tags, user }) => {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Badge count={recommendations} style={{ top: "2.5em", marginRight: "10px" }}>
            <LikeOutlined style={{ fontSize: "2em", lineHeight: "4em" }} />
          </Badge>
        }
        title={
          <a href={`/questions/${qusetId}`} style={{ fontSize: "2em" }}>
            {title}
          </a>
        }
        description={
          <>
            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
              {description}
            </p>
            {tags.map((tag) => {
              return <Tag>{tag}</Tag>;
            })}
          </>
        }
      />
    </List.Item>
  );
};

export default QuestionItem;
