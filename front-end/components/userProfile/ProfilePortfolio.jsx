/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Avatar, Popover, Tag } from "antd";
import Link from "next/link";
import {
  profileContentCardContainer,
  portfolioContainer,
  portfolioStyle,
  popoverStyle,
} from "./styles/MyInfoStyles";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
const ProfilePortfolio = () => {
  const [showHeader, setShowHeader] = useState(null);
  const { myPortfolios } = useSelector((state) => state.portfolio);

  const isresponsive = useMediaQuery({
    query: "(max-width:768px)",
  });

  useEffect(() => {
    setShowHeader(isresponsive);
  }, [isresponsive]);

  const textLimitHandler = (text, limit) => {
    if (text.length >= limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  };

  const skills = (list) => {
    return (
      <div css={popoverStyle}>
        {list.map((e, i) => {
          return <Tag key={`${e}+${i}`}>{e}</Tag>;
        })}
      </div>
    );
  };

  return (
    <Card css={profileContentCardContainer}>
      <div css={portfolioContainer}>
        {myPortfolios &&
          myPortfolios.map((e) => {
            return (
              <div id="check" css={portfolioStyle} key={e._id}>
                <Link href={`/portfolio/${e._id}`}>
                  <div style={{ cursor: "pointer" }}>
                    <div>
                      <img src="https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg" />
                      <div id="gradation">
                        <div id="textbox">
                          <h3>
                            {showHeader
                              ? textLimitHandler(e.title, 20)
                              : textLimitHandler(e.title, 35)}
                          </h3>
                          <p>
                            {showHeader
                              ? textLimitHandler(e.content, 25)
                              : textLimitHandler(e.content, 40)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <Popover placement="bottom" content={skills(e.skills)}>
                            <h3>skills</h3>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div>
                  <div>
                    <Link href={`/profile/${e.author?._id}`}>
                      <Avatar
                        style={{ cursor: "pointer" }}
                        size={25}
                        src="https://joeschmoe.io/api/v1/random"
                      />
                    </Link>
                    <h3>
                      <Link href={`/profile/${e.author?._id}`}>
                        <a>{e.author?.nickname}</a>
                      </Link>
                    </h3>
                  </div>
                  <div>
                    <StarOutlined />
                    <p>{e.recommends}</p>
                    <LikeOutlined />
                    <p>{e.comments.length}</p>
                    <MessageOutlined />
                    <p>{e.comments.length}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Card>
  );
};
export default ProfilePortfolio;
