/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { KakaoLogo, NaverLogo } from "./OAuthLogos/OAtuhLogos";
const OAuthSign = () => {
  const OAuthStyle = css`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    & > * {
      width: 100%;
      padding: 0 !important;
    }
    & > h3 {
      font-size: 14px;
      text-align: center;
      margin: 0;
    }
    & ul {
      width: 100%;
      list-style: none;
      display: flex;
      justify-content: center;
      gap: 40px;
      margin: 0;
      padding: 0;
    }
    & li > a {
      color: black;
      z-index: 1000;
    }
  `;

  return (
    <section css={OAuthStyle}>
      <h3>SNS 계정으로 간편 로그인/회원가입</h3>
      <div>
        <ul>
          <li>
            <a href="#" title="카카오 아이디로 가입하기">
              <KakaoLogo />
            </a>
          </li>
          <li>
            <a href="#" title="네이버 아이디로 가입하기">
              <NaverLogo />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default OAuthSign;
