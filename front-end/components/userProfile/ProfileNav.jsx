/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
import { profileNavContainer, profileNavStyle } from "./styles/ProfileNavStyles";
import { useSelector } from "react-redux";

const ProfileNav = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <div css={profileNavContainer}>
      <ul css={profileNavStyle}>
        <li>
          <Link href={`/profile/${me && me._id}`}>
            <a>프로필</a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/${me && me._id}/portfolio`}>
            <a>포트폴리오</a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/${me && me._id}/scrap`}>
            <a>스크랩북</a>
          </Link>
        </li>
        <li>
          <Link href={`/profile/${me && me._id}/qna`}>
            <a>질문&답변</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default ProfileNav;
