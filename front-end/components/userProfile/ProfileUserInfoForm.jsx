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
  const { userinfo } = useSelector((state) => state.user.userInfo);
  const { register, reset } = useForm({ defaultValues: userinfo });
  const { ref, ...rest } = register("imgUrl");
  // form에 사용되는 state value 넣어주기
  useEffect(() => {
    reset(userinfo);
    setSkills(userinfo.skills);
    if (userinfo.imgUrl) {
      setInputImage(userinfo.imgUrl);
    }
  }, []);

  return (
    <form css={myInfoFormStyle}>
      <label>{"닉네임"}</label>
      <input readOnly={userinfo && userinfo.nickname} {...register("nickname")} />

      <label>{"직업"}</label>
      <input readOnly={(userinfo && userinfo.job) || ""} {...register("job")} />
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
