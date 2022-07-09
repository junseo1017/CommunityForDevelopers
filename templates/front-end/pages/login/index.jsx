/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider } from "antd";
import Link from "next/link";
import SignInForm from "../../components/Sign/SignInForm";
import LoginLogo from "../../components/Sign/LoginLogo";
import { LoginPageContainer } from "./loginstyle";
const Login = () => {
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
      <section>
        <Divider plain></Divider>
        <div>
          <h2>SNS 계정으로 간편 로그인/회원가입</h2>
          <div>
            <div>네이버</div>
            <div>카카오</div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
