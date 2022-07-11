/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useRouter } from "next/router";
import { Avatar, Card } from "antd";
import {
  ProfileCardContainer,
  ProfileCardContent,
  CardProfile,
  CardDetail,
} from "./styles/ProfileCardStyles";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { nickname } = userInfo;
  const isresponsive = useMediaQuery({
    query: "(max-width:768px)",
  });
  return (
    <Card css={ProfileCardContainer}>
      <div>
        <div css={CardProfile}>
          <Avatar size={isresponsive ? 130 : 150} src="https://joeschmoe.io/api/v1/random" />
          {nickname ? <p>{nickname}</p> : <p></p>}
        </div>
        <div css={ProfileCardContent}>
          <div>
            <p>좋아요</p>
            <h3>1</h3>
          </div>
          <div>
            <p>스크랩</p>
            <h3>1</h3>
          </div>
          <div>
            <p>포트폴리오</p>
            <h3>1</h3>
          </div>
        </div>
        <div></div>
      </div>
    </Card>
  );
};
export default ProfileCard;
