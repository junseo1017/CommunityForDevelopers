import React, { useState } from "react";
import { Badge } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import axios from "axios";

axios.defaults.withCredentials = true;

const Like = ({ qnaId, recommendData }) => {
  console.log(recommendData);

  const [isChanged, setIsChanged] = useState(false);

  const handleLikeClick = async () => {
    try {
      if (!isChanged) {
        setIsChanged(true);
        const res = await axios.put(
          `/api/qnas/${qnaId}/recommendation?recommended=${!recommendData.isRecommended}`,
        );
        console.log(res);
        recommendData = {
          isRecommended: !recommendData.isRecommended,
          numberOfRecommends: recommendData.numberOfRecommends++,
        };
        setIsChanged(false);
      }
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
