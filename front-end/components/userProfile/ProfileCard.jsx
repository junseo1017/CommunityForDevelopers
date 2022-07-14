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

const ProfileCard = ({ me }) => {
  const [showresUI, setShowresUI] = useState(false);
  const isresponsive = useMediaQuery({
    query: "(max-width:768px)",
  });

  useEffect(() => {
    if (isresponsive) {
      setShowresUI(true);
    } else setShowresUI(false);
  }, [isresponsive]);

  return (
    <Card css={ProfileCardContainer}>
      <div>
        <div css={CardProfile}>
          <Avatar size={showresUI ? 100 : 150} src="https://joeschmoe.io/api/v1/random" />
          {me ? <p>{me.nickname}</p> : <p></p>}
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
