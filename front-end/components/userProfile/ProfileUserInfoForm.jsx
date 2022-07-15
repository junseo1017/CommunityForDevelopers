/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Tag } from "antd";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { myInfoFormStyle, myInfoSkills } from "./styles/MyInfoStyles";
import Image from "next/image";

const ProfileUserInfoForm = () => {
  const imageinputRef = useRef();
  const [skills, setSkills] = useState([]);
  const [inputImage, setInputImage] = useState("/image/profile_image_default.jpg");
  const { userInfo } = useSelector((state) => state.user);
  const { register, reset } = useForm({ defaultValues: userInfo });
  const { ref, ...rest } = register("imgUrl");

  // form에 사용되는 state value 넣어주기
  useEffect(() => {
    reset(userInfo);
    setSkills(userInfo.skills);
    if (userInfo.imgUrl) {
      setInputImage(userInfo.imgUrl);
    }
  }, []);

  return (
    <form css={myInfoFormStyle}>
      <label>{"이메일"}</label>
      <input readOnly={(userInfo && userInfo.email) || ""} {...register("email")} />

      <label>{"별명 *"}</label>
      <input readOnly={(userInfo && userInfo.nickname) || ""} {...register("nickname")} />

      <label>{"프로필 사진"}</label>
      <div style={{ width: "150px" }}>
        <Image
          src={"/image/profile_image_default.jpg"}
          layout="responsive"
          width="100%"
          height="100%"
        />
      </div>
      <label>{"직업"}</label>
      <input readOnly={(userInfo && userInfo.job) || ""} list="list" />
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
        <div>
          {skills &&
            skills.map((e, i) => {
              return (
                <Tag key={`${e}+${i}`} color="default">
                  {e}
                </Tag>
              );
            })}
        </div>
      </div>
    </form>
  );
};

export default ProfileUserInfoForm;
