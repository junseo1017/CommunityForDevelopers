/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useForm } from "react-hook-form";
import { SignInFormStyle, SignBtnStyle, errorInput } from "./SignStyles";

const RegExp = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form css={SignInFormStyle} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          css={errors.email && errorInput}
          placeholder="이메일을 입력해주세요"
          {...register("email", {
            required: true,
            pattern: {
              value: RegExp.email,
            },
          })}
        />
        <input
          css={errors.email && errorInput}
          placeholder="비밀번호을 입력해주세요"
          {...register("password", {
            required: true,
            pattern: {
              value: RegExp.password,
            },
          })}
        />
      </div>
      <input css={SignBtnStyle} type="submit" value={"로그인"} />
    </form>
  );
};
export default SignInForm;
