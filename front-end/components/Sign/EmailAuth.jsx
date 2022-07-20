/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { RandomNum } from "../Common/utils";
import { EmailAuthBtn, emailAuthStyle } from "./styles/emailAuth";
import { useDispatch } from "react-redux";
import { emailAuth } from "../../actions/user";

let Timer;

const EmailAuth = ({ setShowEmailAuth, randomNumRef, setAuthDone, email }) => {
  const [emailCorrect, setEmailCorrect] = useState(null);
  const inputRef = useRef("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailCorrect) {
      clearTimeout(Timer);
      setAuthDone(true);
      setShowEmailAuth(false);
    }
  }, [emailCorrect]);

  useEffect(() => {
    clearTimeout(Timer);
    Timer = setTimeout(() => {
      randomNumRef.current = false;
      setShowEmailAuth(false);
    }, 300000);
  }, []);

  const EmailAuthHandler = () => {
    if (randomNumRef.current == Number(inputRef.current.value)) {
      setEmailCorrect(true);
    } else {
      setEmailCorrect(false);
    }
  };

  const EmailAuthResend = () => {
    randomNumRef.current = RandomNum();
    dispatch(emailAuth({ email, authNumber: randomNumRef.current }));
  };

  return (
    <div css={emailAuthStyle}>
      <input ref={inputRef} type="text" placeholder="이메일로 전송된 인증번호를 입력해주세요" />
      <button css={EmailAuthBtn} onClick={EmailAuthHandler} type="button">
        인증하기
      </button>
      <div>
        <p>5분 안에 인증번호를 입력해주세요.</p>
        <h3 onClick={EmailAuthResend}>인증번호 재전송</h3>
      </div>
    </div>
  );
};
export default EmailAuth;
