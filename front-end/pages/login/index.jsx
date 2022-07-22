/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider } from "antd";
import { useEffect } from "react";
import Link from "next/link";
import SignInForm from "../../components/Sign/SignInForm";
import LoginLogo from "../../components/Sign/LoginLogo";
import { LoginPageContainer } from "../../styles/loginstyle";
import OAuthSign from "../../components/Sign/OAuthSign";
import { getGithubLoginUrl, getKakaoLoginUrl } from "../../actions/user";
import { useSelector } from "react-redux";
import Router from "next/router";
import wrapper from "../../store";
const Login = () => {
  const { me } = useSelector((state) => state.user);

  // 로그인 된 상태로 로그인 페이지 이동 시 홈으로 라우팅
  useEffect(() => {
    if (me) Router.push("/");
  }, [me]);

  return (
    <div css={LoginPageContainer}>
      <Link href="/">
        <a aria-label="CFD 홈페이지로 이동">
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({}) => {
  await store.dispatch(getGithubLoginUrl());
  await store.dispatch(getKakaoLoginUrl());
  return {
    props: {},
  };
});

export default Login;
