/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useRouter } from "next/router";
import { Avatar, Card } from "antd";
import { ProfileCardContainer, ProfileCardContent, CardProfile } from "./styles/ProfileCardStyles";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const ProfileCard = () => {
  const [showUI, setShowUI] = useState(false);
  const { userinfo, count } = useSelector((state) => state.user.userInfo);
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
      <section>
        <div css={CardProfile}>
          <Avatar
            alt="사용자 프로필 사진"
            size={showUI ? 100 : 150}
            src={userinfo?.imgUrl ? userinfo.imgUrl : "/image/profile_image_default.jpg"}
          />
          {userinfo && <h2>{userinfo.nickname}</h2>}
        </div>
        <ul css={ProfileCardContent}>
          <li>
            <h3>포트폴리오</h3>
            <p>{count && count.portfolioCount}</p>
          </li>
          <li>
            <h3>스크랩</h3>
            <p>{count && count.scrapCount}</p>
          </li>
          <li>
            <h3>질문</h3>
            <p>{count && count.questionCount}</p>
          </li>
          <li>
            <h3>답변</h3>
            <p>{count && count.answerCount}</p>
          </li>
        </ul>
        <div></div>
      </section>
    </Card>
  );
};
export default ProfileCard;
