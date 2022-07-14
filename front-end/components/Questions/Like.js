import React from "react";
import { Badge } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import axios from "axios";

axios.defaults.withCredentials = true;

const Like = ({ qnaId, recommendData, setIsChanged }) => {
  console.log(recommendData);

  const handleLikeClick = async () => {
    try {
      const res = await axios.put(
        `/api/qnas/${qnaId}/recommendation?recommended=${!recommendData.isRecommended}`,
      );
      console.log(res);
      setIsChanged(true);
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
          <LikeFilled style={{ fontSize: "2em" }} />
        ) : (
          <LikeOutlined style={{ fontSize: "2em" }} />
        )}
      </Badge>
    </div>
  );
};

export default Like;
