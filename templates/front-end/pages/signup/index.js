/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import LoginLogo from "../../components/Sign/LoginLogo";
import SignUpForm from "../../components/Sign/SignUpForm";

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
  return (
    <div css={signUpContainer}>
      <LoginLogo />
      <SignUpForm />
    </div>
  );
};
export default SignUp;
