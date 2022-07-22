/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Tag } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { myInfoFormStyle, myInfoSkills } from "./styles/MyInfoStyles";

const ProfileUserInfoForm = () => {
  const [skills, setSkills] = useState([]);
  const { userinfo } = useSelector((state) => state.user.userInfo);
  const { register } = useForm({ defaultValues: userinfo });
  // form에 사용되는 state value 넣어주기
  useEffect(() => {
    if (userinfo) {
      setSkills(userinfo.skills);
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
