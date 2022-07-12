/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag } from "antd";
import { useRouter } from "next/router";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { patchUserinfo } from "../../actions/user";
import {
  myInfoCardContainer,
  myInfoSubmitBtnStyle,
  myInfoFormStyle,
  myInfoSkills,
} from "./styles/MyInfoStyles";

const ProfileMyInfo = () => {
  const skillRef = useRef([]);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(
      patchUserinfo({
        userId: "5HKrqUmpNJYFi8_aiOGnw",
        email: userInfo.email,
        password: "123123as",
        currentPassword: "123123as",
        nickname: userInfo.nickname,
        job: userInfo.job,
        skills: userInfo.skills,
      }),
    );
    console.log(data);
  };

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
        <input
          style={{ backgroundColor: "rgb(220,220,220)" }}
          value={userInfo.email || ""}
          {...register("email")}
        />

        <label>{"별명"}</label>
        <input defaultValue={userInfo.nickname} {...register("nickname")} />

        <label>{"프로필 사진"}</label>
        <input defaultValue={userInfo.imgUrl} {...register("imgUrl")} />

        <label>{"직업"}</label>
        <input
          defaultValue={userInfo.imgUrl}
          {...register("imgUrl")}
          list="list"
          autoComplete="off"
        />
        <datalist id="list">
          <option value="웹 개발자" />
          <option value="서버 개발자" />
          <option value="프론트엔드 개발자" />
          <option value="소프트웨어 엔지니어" />
          <option value="안드로이드 개발자" />
          <option value="iOS 개발자" />
          <option value="데이터 엔지니어" />
          <option value="학생" />
          <option value="DevOps 엔지니어" />
          <option value="머신러닝 엔지니어" />
        </datalist>

        <label>{"사용 기술"}</label>
        <div css={myInfoSkills}>
          <div>
            <input onKeyDown={onKeyPress} defaultValue={userInfo.skills} {...register("skills")} />
            <div></div>
          </div>
        </div>

        <input css={myInfoSubmitBtnStyle} type="submit" value={"회원정보 변경"} />
      </form>
    </Card>
  );
};
export default ProfileMyInfo;
