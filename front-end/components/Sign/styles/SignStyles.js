/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

export const SignInFormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & input {
    padding-left: 10px;
    width: 300px;
    height: 50px;
  }
  & > div > input {
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(219, 219, 219);
    font-size: 15px;
    line-height: 21px;
    transition: 100ms linear;

    &::placeholder {
      /* padding-left: 10px; */
    }

    &:focus {
      outline: none !important;
      box-shadow: 0 0 10px #719ece;
      z-index: 10000;
    }
  }
  & > div {
    input:first-of-type {
      border-radius: 4px 4px 0 0;
    }
    input:last-of-type {
      border-radius: 0 0 4px 4px;
    }
  }
  & > input {
    border: none;
    display: flex;
    justify-content: center;
    font-weight: 700;
  }
`;

export const SignBtnStyle = css`
  background-color: rgb(210, 210, 210);
  display: flex;
  transition: 100ms linear;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: black;
    color: white;
  }
`;

export const OAuthStyle = css`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  & > * {
    width: 100%;
    padding: 0 !important;
  }
  & > h2 {
    font-size: 14px !important;
    text-align: center;
    margin: 0;
  }
  & ul {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 40px;
    margin: 0;
    padding: 0;
  }
  & li > a {
    color: black;
    z-index: 1000;
  }
`;

export const SignUpFormStyle = css`
  margin: 0 auto;
  & * {
    margin: 0;
  }
  & h2 {
    width: 100%;
    font-size: 20px;
    font-weight: 700;
  }
`;

export const SignUpOAuthStyle = css`
  & > h3 {
    font-size: 15px;
    text-align: center;
    padding: 10px;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 20px 0;
  }
`;

export const SignUpContentStyle = css`
  padding: 30px 0;
  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  & label {
    font-size: 15px;
    font-weight: 700;
    padding-left: 2px;
  }
  // 회원가입 인풋 설명
  & p {
    font-size: 12px;
    color: rgb(160, 160, 160);
    font-weight: 500;
    padding-left: 2px;
  }
  // 에러메세지
  & strong {
    font-size: 12px;
    text-decoration: none;
    color: rgb(255, 119, 119);
    padding-left: 5px;
    font-weight: 500;
  }
  & input {
    width: 360px;
    height: 40px;
    border-radius: 5px;
    font-weight: 700;
    margin: 5px 0;
    border: 1px solid rgb(219, 219, 219);
    transition: 100ms linear;
    padding-left: 10px;
    ::placeholder {
      font-weight: 500;
      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
    :focus {
      outline: none !important;
      box-shadow: 0 0 10px #719ece;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  & > form > div {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  & > form > div div {
    display: flex;
    flex-direction: column;
  }
`;

export const signUpBtn = css`
  width: 360px;
  height: 50px !important;
  border: none !important;
  background-color: rgb(210, 210, 210);
  text-align: center;
  transition: 100ms linear;
  border-radius: 5px;
  font-size: 16px;

  cursor: pointer;
  :hover {
    background-color: black;
    color: white;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const errorInput = css`
  border: 1px solid rgb(255, 119, 119) !important;
  :focus {
    box-shadow: 0 0 0 2px rgb(255, 119, 119) !important;
  }
`;
