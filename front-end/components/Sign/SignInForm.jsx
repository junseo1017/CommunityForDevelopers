/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider, message } from "antd";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { SignInFormStyle, SignBtnStyle, errorInput } from "./styles/SignStyles";
import { login } from "../../actions/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegExp } from "../Common/utils";

const SignInForm = () => {
  const dispatch = useDispatch();
  const { loginDone, loginError } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loginDone) {
      Router.push("/");
    }
    if (loginError) {
      message.error("로그인에 실패하였습니다.");
    }
  }, [loginDone, loginError]);

  const onSubmit = (data) => {
    dispatch(
      login({
        email: data.email,
        password: data.password,
      }),
    );
  };

  return (
    <form css={SignInFormStyle} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          autoComplete="off"
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
          autoComplete="off"
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
