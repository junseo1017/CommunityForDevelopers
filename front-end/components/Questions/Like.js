import React, { useState } from "react";
import { Badge } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import axios from "axios";
import Router from "next/router";

axios.defaults.withCredentials = true;

const Like = ({ qnaId, recommendData }) => {
  console.log(recommendData);

  const handleLikeClick = async () => {
    try {
      await axios.put(
        `/api/qnas/${qnaId}/recommendation?recommended=${!recommendData.isRecommended}`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="badge-container"
      onClick={() => {
        handleLikeClick();
      }}>
      <Badge showZero count={recommendData.numberOfRecommends}>
        {recommendData.isRecommended ? (
          <LikeFilled style={{ fontSize: "1.75em", color: "#1890ff" }} />
        ) : (
          <LikeOutlined style={{ fontSize: "1.75em" }} />
        )}
      </Badge>
    </div>
  );
};

export default Like;
