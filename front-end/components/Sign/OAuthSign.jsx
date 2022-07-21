/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { KakaoLogo, GithubLogo } from "./OAuthLogos/OAtuhLogos";
import { OAuthStyle } from "./styles/SignStyles";
import { useSelector, useDispatch } from "react-redux";
const OAuthSign = () => {
  const dispatch = useDispatch();
  const { githubLoginUrl, kakaoLoginUrl } = useSelector((state) => state.user);

  return (
    <section css={OAuthStyle}>
      <h2>SNS 계정으로 간편 로그인/회원가입</h2>
      <div>
        <ul>
          <li>
            <a href={kakaoLoginUrl && kakaoLoginUrl} aria-label="카카오 아이디로 가입하기">
              <KakaoLogo />
            </a>
          </li>
          <li>
            <a href={githubLoginUrl && githubLoginUrl} aria-label="깃허브 아이디로 가입하기">
              <GithubLogo />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default OAuthSign;
