/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { message } from "antd";
import LoginLogo from "../../components/Sign/LoginLogo";
import SignUpForm from "../../components/Sign/SignUpForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const signUpContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-height: 100vh;
  background-color: rgb(250, 250, 250);
  margin: 0 auto;
`;

const SignUp = () => {
  const router = useRouter();
  const { signupDone, signupError } = useSelector((state) => state.user);

  // 회원가입 성공 메세지
  useEffect(() => {
    if (signupDone) {
      message.success("회원가입에 성공하였습니다.");
      router.push("/login");
    }
    if (signupError) {
      message.error("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  }, [signupDone, signupError]);

  return (
    <div css={signUpContainer}>
      <Link href="/">
        <a>
          <LoginLogo />
        </a>
      </Link>
      <SignUpForm />
    </div>
  );
};
export default SignUp;
