/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider, message, Spin } from "antd";
import { SignUpFormStyle, SignUpContentStyle, signUpBtn, errorInput } from "./styles/SignStyles";
import { EmailAuthBtn, EmailAuthDoneBtn } from "./styles/emailAuth";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/user";
import { useForm } from "react-hook-form";
import { emailAuth } from "../../actions/user";
import OAuthSign from "./OAuthSign";
import EmailAuth from "./EmailAuth";
import { RandomNum } from "../Common/utils";
import { RegExp } from "../Common/utils";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const randomNumRef = useRef("");
  const emailRef = useRef("");
  const [showemailAuth, setShowEmailAuth] = useState(false);
  const [authDone, setAuthDone] = useState(false);
  const { emailAuthDone, emailAuthError, emailAuthLoading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (emailAuthDone) {
      message.success("입력하신 이메일로 인증번호가 발송되었습니다!");
      setShowEmailAuth(true);
    }
    if (emailAuthError) {
      message.error("인증번호 전송에 실패했습니다. 다시 시도해주세요.");
    }
  }, [emailAuthDone, emailAuthError]);

  const onSubmit = (data) => {
    if (!authDone) {
      return message.error("이메일 인증을 완료해주세요.");
    }
    if (emailRef.current !== watch("email")) {
      return message.error("인증받은 이메일로 가입을 시도해주세요.");
    }
    dispatch(
      signup({
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      }),
    );
  };

  const emailErrorMessage = () => {
    if (errors.email && errors.email.type === "required") {
      return <strong>이메일을 입력해주세요.</strong>;
    } else if (errors.email && errors.email.type === "pattern") {
      return <strong>{errors.email.message}</strong>;
    }
  };

  const pwErrorMessage = () => {
    if (errors.password && errors.password.type === "required") {
      return <strong>비밀번호를 입력해주세요</strong>;
    } else if (errors.password && errors.password.type === "pattern") {
      return <strong>{errors.password.message}</strong>;
    }
  };

  const pwCkErrorMessage = () => {
    if (errors.passwordCheck && errors.passwordCheck.type === "required") {
      return <strong>비밀번호를 한 번 더 입력해주세요</strong>;
    } else if (errors.passwordCheck && errors.passwordCheck.type === "validate") {
      return <strong>{errors.passwordCheck.message}</strong>;
    }
  };

  const nicknameErrorMessage = () => {
    if (errors.nickname && errors.nickname.type === "required") {
      return <strong>닉네임을 입력해주세요</strong>;
    } else if (errors.nickname && errors.nickname.type === "minLength") {
      return <strong>{errors.nickname.message}</strong>;
    }
  };

  const EmailAuthHandler = () => {
    if (RegExp.email.test(watch("email"))) {
      randomNumRef.current = RandomNum();
      emailRef.current = watch("email");
      dispatch(emailAuth({ email: watch("email"), authNumber: randomNumRef.current }));
      return;
    } else {
      message.error("이메일이 제대로 입력되었는지 확인해주세요.");
    }
  };

  return (
    <div css={SignUpFormStyle}>
      <main>
        <h2>회원가입</h2>
        <OAuthSign />
        <Divider plain></Divider>
        <section css={SignUpContentStyle}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="emailInput">이메일</label>
                <input
                  id="emailInput"
                  autoComplete="off"
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
                {showemailAuth ? (
                  <EmailAuth
                    randomNumRef={randomNumRef}
                    setAuthDone={setAuthDone}
                    setShowEmailAuth={setShowEmailAuth}
                    email={watch("email")}
                  />
                ) : authDone ? (
                  <button type="button" css={EmailAuthDoneBtn}>
                    인증완료
                  </button>
                ) : (
                  <button type="button" onClick={EmailAuthHandler} css={EmailAuthBtn}>
                    {emailAuthLoading ? <Spin /> : `인증하기`}
                  </button>
                )}
              </div>
              <div>
                <label htmlFor="passwordInput">비밀번호</label>
                <p>문자,숫자,특수문자를 조합한 8~15자리 비밀번호를 입력해주세요</p>
                <input
                  id="passwordInput"
                  css={errors.password && errorInput}
                  autoComplete="off"
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
                <label htmlFor="passwordConfirmInput">비밀번호 확인</label>
                <input
                  id="passwordConfirmInput"
                  css={errors.passwordCheck && errorInput}
                  autoComplete="off"
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  {...register("passwordCheck", {
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
                <label htmlFor="nicknameInput">닉네임</label>
                <p>CFD에서 사용될 2~15자리의 닉네임</p>
                <input
                  id="nicknameInput"
                  autoComplete="off"
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
            <input css={signUpBtn} type="submit" value={`회원가입하기`} />
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignUpForm;
