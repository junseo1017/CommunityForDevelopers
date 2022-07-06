/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { profileNavContainer, profileNavStyle } from "./styles/ProfileNavStyles";
const ProfileNav = () => {
  return (
    <div css={profileNavContainer}>
      <ul css={profileNavStyle}>
        <li>
          <a href="">내 정보</a>
        </li>
        <li>
          <a href="">포트폴리오</a>
        </li>
        <li>
          <a href="">스크랩북</a>
        </li>
        <li>
          <a href="">질문&답변</a>
        </li>
      </ul>
    </div>
  );
};
export default ProfileNav;
