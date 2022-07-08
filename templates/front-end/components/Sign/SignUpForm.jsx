/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider } from "antd";
import { useForm } from "react-hook-form";
import {
  SignUpFormStyle,
  SignUpOAuthStyle,
  SignUpContentStyle,
  signUpBtn,
  errorInput,
  input,
} from "./SignStyles";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div css={SignUpFormStyle}>
      <div>
        <h2>회원가입</h2>
        <section css={SignUpOAuthStyle}>
          <h3>간편 회원가입</h3>
          <div>
            <p>네이버</p>
            <p>카카오</p>
          </div>
        </section>
        <Divider plain></Divider>
        <section css={SignUpContentStyle}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div css={errors.email ? errorInput : input}>
              <div>
                <label>이메일</label>
                <input
                  placeholder="이메일을 입력해주세요"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "이메일을 형식에 맞게 입력해주세요.",
                    },
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <span>이메일을 입력해주세요.</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span>{errors.email.message}</span>
                )}
              </div>
              <div>
                <label>비밀번호</label>
                <p>8자리 이상 입력해주세요.</p>
                <input placeholder="비밀번호를 입력해주세요" {...register("password")} />
              </div>
              <div>
                <label>비밀번호 확인</label>
                <input
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  {...register("passwordCheck")}
                />
              </div>
              <div>
                <label>닉네임</label>
                <p>CFD에서 사용될 2~15자리의 닉네임</p>
                <input placeholder="닉네임을 입력해주세요" {...register("nickname")} />
              </div>
            </div>
            <input css={signUpBtn} type="submit" value={"회원가입하기"} />
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignUpForm;
