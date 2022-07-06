/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useRouter } from "next/router";
import { Avatar, Card } from "antd";
import { ProfileCardContainer, ProfileCardContent, CardProfile } from "./styles/ProfileCardStyles";

const ProfileCard = () => {
  const router = useRouter();
  return (
    <Card css={ProfileCardContainer}>
      <div>
        <div css={CardProfile}>
          <Avatar size={150} src="https://joeschmoe.io/api/v1/random" />
          <p>{router.query.id}</p>
        </div>
        <div css={ProfileCardContent}>
          <p>좋아요</p>
          <p>스크랩</p>
          <p>포트폴리오</p>
        </div>
        <div></div>
      </div>
    </Card>
  );
};
export default ProfileCard;
