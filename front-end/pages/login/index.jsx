/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider } from "antd";
import { useEffect } from "react";
import Link from "next/link";
import SignInForm from "../../components/Sign/SignInForm";
import LoginLogo from "../../components/Sign/LoginLogo";
import { LoginPageContainer } from "./loginstyle";
import OAuthSign from "../../components/Sign/OAuthSign";
import { useSelector } from "react-redux";
import Router from "next/router";
const Login = () => {
  const { me, oauthInfo } = useSelector((state) => state.user);

  // 로그인 된 상태로 로그인 페이지 이동 시 홈으로 라우팅
  useEffect(() => {
    if (me) Router.push("/");
  }, [me]);

  return (
    <div css={LoginPageContainer}>
      <Link href="/">
        <a>
          <LoginLogo />
        </a>
      </Link>
      <SignInForm />
      <Link href="/signup">
        <h2 className="signUp">회원가입</h2>
      </Link>
      <div>
        <Divider plain></Divider>
      </div>
      <OAuthSign />
    </div>
  );
};
export default Login;
