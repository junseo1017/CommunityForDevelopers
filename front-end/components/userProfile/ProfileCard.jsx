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
import { useEffect } from "react";
import { useState } from "react";

const ProfileCard = () => {
  const [showUI, setShowUI] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const isresponsive = useMediaQuery({
    query: "(max-width:768px)",
  });
  useEffect(() => {
    if (isresponsive) {
      setShowUI(true);
    } else setShowUI(false);
  }, [isresponsive]);

  return (
    <Card css={ProfileCardContainer}>
      <div>
        <div css={CardProfile}>
          <Avatar size={showUI ? 100 : 150} src="https://joeschmoe.io/api/v1/random" />
          {userInfo && <p>{userInfo.nickname}</p>}
        </div>
        <div css={ProfileCardContent}>
          <div>
            <p>포트폴리오</p>
            <h3>1</h3>
          </div>
          <div>
            <p>스크랩</p>
            <h3>1</h3>
          </div>
          <div>
            <p>질문</p>
            <h3>1</h3>
          </div>
          <div>
            <p>답변</p>
            <h3>1</h3>
          </div>
        </div>
        <div></div>
      </div>
    </Card>
  );
};
export default ProfileCard;
