/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { KakaoLogo, GithubLogo } from "./OAuthLogos/OAtuhLogos";
import { OAuthStyle } from "./SignStyles";
import { useSelector, useDispatch } from "react-redux";
import { getKakaoLoginUrl } from "../../actions/user";
const OAuthSign = () => {
  const dispatch = useDispatch();
  const { githubLoginUrl, kakaoLoginUrl } = useSelector((state) => state.user);

  return (
    <section css={OAuthStyle}>
      <h3>SNS 계정으로 간편 로그인/회원가입</h3>
      <div>
        <ul>
          <li>
            <a href={kakaoLoginUrl && kakaoLoginUrl} title="카카오 아이디로 가입하기">
              <KakaoLogo />
            </a>
          </li>
          <li>
            <a href={githubLoginUrl && githubLoginUrl} title="깃허브 아이디로 가입하기">
              <GithubLogo />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default OAuthSign;
