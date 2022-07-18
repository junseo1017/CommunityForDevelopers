/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { KakaoLogo, NaverLogo, GithubLogo } from "./OAuthLogos/OAtuhLogos";
import { OAuthStyle } from "./SignStyles";
import { githubLogin } from "../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const OAuthSign = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const OAuthHandler = async () => {
    dispatch(githubLogin());
  };

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
            <a onClick={OAuthHandler} title="네이버 아이디로 가입하기">
              <GithubLogo />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default OAuthSign;
