/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
import { profileNavContainer, profileNavStyle } from "./styles/ProfileNavStyles";
const ProfileNav = () => {
  return (
    <div css={profileNavContainer}>
      <ul css={profileNavStyle}>
        <li>
          <Link href="/profile/3">
            <a>내 정보</a>
          </Link>
        </li>
        <li>
          <Link href="/profile/portfolio/3">
            <a>포트폴리오</a>
          </Link>
        </li>
        <li>
          <Link href="/profile/scrap/3">
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
