/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import { useForm } from "react-hook-form";
import { SignInFormStyle, SignBtnStyle } from "./SignStyles";
const SignInForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form css={SignInFormStyle} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="이메일을 입력해주세요" {...register("email")} />
        <input placeholder="비밀번호을 입력해주세요" {...register("password")} />
      </div>
      <input css={SignBtnStyle} type="submit" value={"로그인"} />
    </form>
  );
};
export default SignInForm;
