/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
import { profileNavContainer, profileNavStyle } from "./styles/ProfileNavStyles";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProfileNav = () => {
  const router = useRouter();

  return (
    <nav css={profileNavContainer}>
      <ul css={profileNavStyle}>
        <li>
          <Link href={`/profile/${router.query.id}`}>
            <a>프로필</a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/${router.query.id}/portfolio`}>
            <a>포트폴리오</a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/${router.query.id}/scrap`}>
            <a>스크랩북</a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/${router.query.id}/qna`}>
            <a>질문&답변</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default ProfileNav;
