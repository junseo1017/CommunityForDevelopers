/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { Divider, message } from "antd";
import Router from "next/router";
import axios from "axios";
import { signup } from "../../actions/signup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  SignUpFormStyle,
  SignUpOAuthStyle,
  SignUpContentStyle,
  signUpBtn,
  errorInput,
} from "./SignStyles";

const RegExp = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^[a-zA-Z0-9]{8,15}$/,
};

const SignUpForm = () => {
  const [action, setAction] = useState(null);
  const dispatch = useDispatch();
  const { signupLoading, signupDone, signupError } = useSelector((state) => state.user);

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (action) {
      if (signupDone) {
        message.success("회원가입에 성공하셨습니다.").then(() => Router.push("/").then());
      }
      if (signupError) {
        message.error(JSON.stringify(signupError, null, 4)).then();
      }
      setAction(null);
    }
  }, [signupDone, signupError]);

  const onSubmit = (data) => {
    dispatch(
      signup({
        email: data.user_email,
        nickname: data.user_nickname,
        password: data.user_password,
      }),
    );
    setAction(true);
  };

  const emailErrorMessage = () => {
    if (errors.email && errors.email.type === "required") {
      return <span>이메일을 입력해주세요.</span>;
    } else if (errors.email && errors.email.type === "pattern") {
      return <span>{errors.email.message}</span>;
    }
  };

  const pwErrorMessage = () => {
    if (errors.password && errors.password.type === "required") {
      return <span>비밀번호를 입력해주세요</span>;
    } else if (errors.password && errors.password.type === "pattern") {
      return <span>{errors.password.message}</span>;
    }
  };

  const pwCkErrorMessage = () => {
    if (errors.passwordCheck && errors.passwordCheck.type === "required") {
      return <span>비밀번호를 한 번 더 입력해주세요</span>;
    } else if (errors.passwordCheck && errors.passwordCheck.type === "validate") {
      return <span>{errors.passwordCheck.message}</span>;
    }
  };

  const nicknameErrorMessage = () => {
    if (errors.nickname && errors.nickname.type === "required") {
      return <span>닉네임을 입력해주세요</span>;
    } else if (errors.nickname && errors.nickname.type === "minLength") {
      return <span>{errors.nickname.message}</span>;
    }
  };

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
            <div>
              <div>
                <label>이메일</label>
                <input
                  css={errors.email && errorInput}
                  placeholder="이메일을 입력해주세요"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: RegExp.email,
                      message: "이메일을 형식에 맞게 입력해주세요.",
                    },
                  })}
                />
                {emailErrorMessage()}
              </div>
              <div>
                <label>비밀번호</label>
                <p>문자,숫자를 조합한 8~15자리 비밀번호를 입력해주세요</p>
                <input
                  css={errors.password && errorInput}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: RegExp.password,
                      message: "형식에 맞게 비밀번호를 입력해주세요.",
                    },
                  })}
                />
                {pwErrorMessage()}
              </div>
              <div>
                <label>비밀번호 확인</label>
                <input
                  css={errors.passwordCheck && errorInput}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  {...unregister("passwordCheck", {
                    required: true,
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "비밀번호가 일치하지 않습니다.";
                      }
                    },
                  })}
                />
                {pwCkErrorMessage()}
              </div>
              <div>
                <label>닉네임</label>
                <p>CFD에서 사용될 2~15자리의 닉네임</p>
                <input
                  css={errors.nickname && errorInput}
                  placeholder="닉네임을 입력해주세요"
                  {...register("nickname", {
                    required: true,
                    minLength: {
                      value: 2,
                      message: "형식에 맞는 닉네임을 입력해주세요",
                    },
                    maxLength: {
                      value: 15,
                      message: "형식에 맞는 닉네임을 입력해주세요",
                    },
                  })}
                />
                {nicknameErrorMessage()}
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
