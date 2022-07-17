/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { KakaoLogo, NaverLogo } from "./OAuthLogos/OAtuhLogos";
import { OAuthStyle } from "./SignStyles";
import { githubLogin } from "../../actions/user";
import { useDispatch } from "react-redux";

const OAuthSign = () => {
  const dispatch = useDispatch();
  return (
    <section css={OAuthStyle}>
      <h3>SNS 계정으로 간편 로그인/회원가입</h3>
      <div>
        <ul>
          <li>
            <a title="카카오 아이디로 가입하기">
              <KakaoLogo />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                dispatch(githubLogin());
              }}
              title="네이버 아이디로 가입하기">
              <NaverLogo />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default OAuthSign;
