/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { portfolioStyle, popoverStyle } from "./style/PortfolioCardStyle";
import { Avatar, Popover, Tag } from "antd";
import Link from "next/link";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { DEFAULT_IMAGE } from "../../pages/constants/Image";

const PortfolioCard = ({
  title,
  description,
  skills,
  author,
  comments,
  recommends,
  scraps,
  _id,
  authorImg,
  thumbnail,
}) => {
  const [showHeader, setShowHeader] = useState(null);
  const isresponsive = useMediaQuery({
    query: "(max-width:768px)",
  });
  useEffect(() => {
    setShowHeader(isresponsive);
  }, [isresponsive]);

  const textLimitHandler = (text, limit) => {
    if (text) {
      if (text.length >= limit) {
        return text.substr(0, limit) + "...";
      }
      return text;
    }
  };

  const skillsTag = (list) => {
    return (
      <div css={popoverStyle}>
        {list &&
          list.map((e, i) => {
            return <Tag key={`${e}+${i}`}>{e}</Tag>;
          })}
      </div>
    );
  };

  return (
    <div id="check" css={portfolioStyle} key={_id}>
      <Link href={`/portfolio/${_id}`}>
        <div style={{ cursor: "pointer" }}>
          <div>
            <img src={thumbnail || DEFAULT_IMAGE} />
            <div id="gradation">
              <div id="textbox">
                <h3>{showHeader ? textLimitHandler(title, 20) : textLimitHandler(title, 35)}</h3>
                <p>
                  {showHeader
                    ? textLimitHandler(description, 25)
                    : textLimitHandler(description, 40)}
                </p>
              </div>
            </div>
            <div>
              <div>
                <Popover placement="bottom" content={skillsTag(skills)}>
                  <h3>skills</h3>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div>
        <div>
          <Link href={`/profile/${author?._id}`}>
            <Avatar
              style={{ cursor: "pointer" }}
              size={25}
              src={authorImg ? authorImg : "https://joeschmoe.io/api/v1/random"}
            />
          </Link>
          <h3>
            <Link href={`/profile/${author?._id}`}>
              <a>{author}</a>
            </Link>
          </h3>
        </div>
        <div>
          <div>
            <StarOutlined />
          </div>
          <p>{scraps ? scraps.length : 0}</p>
          <div>
            <LikeOutlined />
          </div>
          <p>{recommends ? recommends.length : 0}</p>
          <div>
            <MessageOutlined />
          </div>
          <p>{comments ? comments.length : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
