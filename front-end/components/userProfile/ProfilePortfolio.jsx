/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Avatar } from "antd";
import Link from "next/link";
import {
  profileContentCardContainer,
  portfolioContainer,
  portfolioStyle,
} from "./styles/MyInfoStyles";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";

const ProfilePortfolio = ({ myPortfolios }) => {
  return (
    <Card css={profileContentCardContainer}>
      <div css={portfolioContainer}>
        {myPortfolios ? (
          myPortfolios.map((e) => {
            return (
              <div id="check" css={portfolioStyle} key={e._id}>
                <div>
                  <div>
                    <img src="https://static.remove.bg/remove-bg-web/5c20d2ecc9ddb1b6c85540a333ec65e2c616dbbd/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg" />
                    <div id="gradation">
                      <div id="textbox">
                        <h3>{e.title}</h3>
                        <p>{e.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <Link href={`/profile/${e.author._id}`}>
                      <Avatar
                        style={{ cursor: "pointer" }}
                        size={25}
                        src="https://joeschmoe.io/api/v1/random"
                      />
                    </Link>
                    <h3>
                      <Link href={`/profile/${e.author._id}`}>
                        <a>{e.author.nickname}</a>
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
          })
        ) : (
          <p></p>
        )}
      </div>
    </Card>
  );
};
export default ProfilePortfolio;
