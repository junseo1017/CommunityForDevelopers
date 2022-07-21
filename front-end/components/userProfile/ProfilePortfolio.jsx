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
import { useSelector } from "react-redux";
import { textLimitHandler } from "../Common/textLimit";
const ProfilePortfolio = () => {
  const { userinfo } = useSelector((state) => state.user.userInfo);
  const { userPortfolios } = useSelector((state) => state.portfolio);

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
        {userPortfolios &&
          userPortfolios.map((e) => {
            return (
              <div id="check" css={portfolioStyle} key={e._id}>
                <Link href={`/portfolio/${e._id}`}>
                  <div style={{ cursor: "pointer" }}>
                    <div>
                      <img src={e.thumbnail} />
                      <div id="gradation">
                        <div id="textbox">
                          <h3>{textLimitHandler(e.title, 15)}</h3>
                          <p>{textLimitHandler(e.description, 17)}</p>
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
                    <Link href={`/profile/${e.authorId}`}>
                      <Avatar
                        style={{ cursor: "pointer" }}
                        size={25}
                        src={userinfo.imgUrl ? userinfo.imgUrl : "/image/profile_image_default.jpg"}
                      />
                    </Link>
                    <h3>
                      <Link href={`/profile/${e.authorId}`}>
                        <a>{e.author}</a>
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
              </div>
            );
          })}
      </div>
    </Card>
  );
};
export default ProfilePortfolio;
