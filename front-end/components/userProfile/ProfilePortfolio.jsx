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
import { textLimitHandler } from "../Common/textLimit";

const ProfilePortfolio = ({ portfoliodata }) => {
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
        {portfoliodata &&
          portfoliodata.map((e) => {
            return (
              <article id="check" css={portfolioStyle} key={e._id}>
                <Link href={`/portfolio/${e._id}`}>
                  <div style={{ cursor: "pointer" }}>
                    <div>
                      <img src={e.thumbnail} />
                      <div id="gradation">
                        <div id="textbox">
                          <h2>{textLimitHandler(e.title, 13)}</h2>
                          <p>{textLimitHandler(e.description, 17)}</p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <Popover placement="bottom" content={skills(e.skills)}>
                            <h5>skills</h5>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div>
                  <div>
                    <Link href={`/profile/${e.authorId}`}>
                      <a aria-label="유저 프로필 페이지로 이동">
                        <Avatar
                          style={{ cursor: "pointer" }}
                          size={25}
                          src={e.authorImg ? e.authorImg : "/image/profile_image_default.jpg"}
                        />
                      </a>
                    </Link>
                    <h3>
                      <Link href={`/profile/${e.authorId}`}>
                        <a aria-label="유저 프로필 페이지로 이동">
                          {textLimitHandler(e.author, 13)}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <div>
                    <StarOutlined />
                    <p>{e.scraps.length}</p>
                    <LikeOutlined />
                    <p>{e.recommends.length}</p>
                    <MessageOutlined />
                    <p>{e.comments.length}</p>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </Card>
  );
};
export default ProfilePortfolio;
