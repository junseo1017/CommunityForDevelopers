/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag } from "antd";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  myInfoCardContainer,
  myInfoSubmitBtnStyle,
  myInfoFormStyle,
  myInfoSkills,
} from "./styles/MyInfoStyles";

const ProfileMyInfo = () => {
  const router = useRouter();
  const array = ["react", "Javascript", "go"];
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const checkKeyDown = useCallback((e) => {
    if (e.code === "Enter") e.preventDefault();
  }, []);

  const onKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      onClickHandler();
    }
  }, []);
  return (
    <Card css={myInfoCardContainer}>
      <form css={myInfoFormStyle} onSubmit={handleSubmit(onSubmit)} onKeyDown={checkKeyDown}>
        <label>{"이메일"}</label>
        <input readOnly={router.query.id} {...register("email")} />
        <label>{"별명"}</label>
        <input {...register("nickname")} />
        <label>{"비밀번호"}</label>
        <input {...register("password")} />
        <label>{"직업"}</label>
        <input {...register("job")} />
        <label>{"사용 기술"}</label>
        <div css={myInfoSkills}>
          <div>
            <input onKeyDown={onKeyPress} {...register("skills")} />
            <div></div>
          </div>
        </div>
        <input css={myInfoSubmitBtnStyle} type="submit" value={"회원정보 변경"} />
      </form>
    </Card>
  );
};
export default ProfileMyInfo;
