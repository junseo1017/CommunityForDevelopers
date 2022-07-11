/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider } from "antd";
import Link from "next/link";
import SignInForm from "../../components/Sign/SignInForm";
import LoginLogo from "../../components/Sign/LoginLogo";
import { LoginPageContainer } from "./loginstyle";
import OAuthSign from "../../components/Sign/OAuthSign";
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
      <div>
        <Divider plain></Divider>
      </div>
      <OAuthSign />
    </div>
  );
};
export default Login;
