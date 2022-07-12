/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
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
  const [skills, setSkills] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({ defaultValues: userInfo });

  useEffect(() => {
    reset(userInfo);
    setSkills(userInfo.skills);
  }, [userInfo]);

  const onSubmit = (data) => {
    // dispatch(
    //   patchUserinfo({
    //     email: userInfo.email,
    //     nickname: data.nickname,
    //     job: data.job,
    //     skills,
    //   }),
    // );
    console.log({
      email: userInfo.email,
      nickname: data.nickname,
      job: data.job,
      skills,
    });
  };

  const checkKeyDown = useCallback((e) => {
    if (e.code === "Enter") e.preventDefault();
  }, []);

  const onKeyPress = (e) => {
    if (!e.target.value) return;
    if (e.key === "Enter") {
      console.log(e.target.value);
      setSkills([...skills, e.target.value]);
      e.target.value = "";
    }
  };

  const deleteTagHandler = (e) => {
    setSkills(skills.filter((elem) => elem != e.target.id));
  };

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
        <input autoComplete="off" {...register("nickname", { required: true })} />

        <label>{"프로필 사진"}</label>
        <input autoComplete="off" {...register("imgUrl")} />

        <label>{"직업"}</label>
        <input {...register("job")} list="list" autoComplete="off" />
        <datalist id="list">
          <option value="웹 개발자" />
          <option value="서버 개발자" />
          <option value="프론트엔드 개발자" />
          <option value="백엔드 개발자" />
          <option value="소프트웨어 엔지니어" />
          <option value="안드로이드 개발자" />
          <option value="iOS 개발자" />
          <option value="데이터 엔지니어" />
          <option value="DevOps 엔지니어" />
          <option value="머신러닝 엔지니어" />
          <option value="학생" />
        </datalist>
        <label>{"사용 기술"}</label>
        <div css={myInfoSkills}>
          <input autoComplete="off" onKeyDown={onKeyPress} />
          <div>
            {skills &&
              skills.map((e, i) => {
                return (
                  <Tag id={e} onClick={deleteTagHandler} key={`e+${i}`} color="default">
                    {e}
                  </Tag>
                );
              })}
          </div>
        </div>
        <input css={myInfoSubmitBtnStyle} type="submit" value={"회원정보 변경"} />
      </form>
    </Card>
  );
};
export default ProfileMyInfo;
