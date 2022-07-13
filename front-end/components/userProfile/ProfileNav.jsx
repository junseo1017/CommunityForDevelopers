/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
import { profileNavContainer, profileNavStyle } from "./styles/ProfileNavStyles";
import { useSelector } from "react-redux";

const ProfileNav = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div css={profileNavContainer}>
      <ul css={profileNavStyle}>
        <li>
          <Link href={`/profile/${userInfo.email}`}>
            <a>프로필</a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/portfolio/${userInfo.email}`}>
            <a>포트폴리오</a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/scrap/${userInfo.email}`}>
            <a>스크랩북</a>
          </Link>
        </li>
        <li>
          <Link href="/profile/scrap/3">
            <a>질문&답변</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default ProfileNav;
