import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import axios from "axios";
import Router from "next/router";

axios.defaults.withCredentials = true;

const Like = ({ qnaId, answer }) => {
  const { me } = useSelector((state) => state.user);
  const currentIsRecommended = answer.recommends.map((user) => user._id).includes(me._id);
  const currentNumberOfRecommends = answer.recommends.length;
  const [recommendData, setRecommendData] = useState(currentIsRecommended);
  const [numberOfRecommends, setNumberOfRecommends] = useState(currentNumberOfRecommends);

  const handleLikeClick = async () => {
    try {
      const response = await axios.put(
        `/api/qnas/${qnaId}/recommendation?recommended=${!recommendData}`,
      );
      console.log("-------------response", response);
      setRecommendData(response.data.recommends.includes(me._id));
      setNumberOfRecommends(response.data.recommends.length);
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
      <Badge showZero count={numberOfRecommends}>
        {recommendData ? (
          <LikeFilled style={{ fontSize: "1.75em", color: "#1890ff" }} />
        ) : (
          <LikeOutlined style={{ fontSize: "1.75em" }} />
        )}
      </Badge>
    </div>
  );
};

export default Like;
