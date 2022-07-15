/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider, message } from "antd";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { SignInFormStyle, SignBtnStyle, errorInput } from "./SignStyles";
import { login } from "../../actions/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

const RegExp = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [signinFlag, setSigninFlag] = useState(null);
  const { loginDone, loginError } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (signinFlag) {
      if (loginDone) {
        Router.push("/");
        setSigninFlag(null);
      }
      if (loginError) {
        message.error(JSON.stringify(loginError.reason, null, 4)).then();
        setSigninFlag(null);
      }
    }
  }, [loginDone, loginError]);

  const onSubmit = (data) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
      }),
    );
    setSigninFlag(true);
  };

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
          css={errors.password && errorInput}
          type="password"
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
