/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { message, Tag } from "antd";
import { useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { patchUserinfo } from "../../actions/user";
import { myInfoSubmitBtnStyle, myInfoFormStyle, myInfoSkills } from "./styles/MyInfoStyles";
import Image from "next/image";

const ProfileMyInfoForm = ({ action, setAction }) => {
  const imageinputRef = useRef();
  const [skills, setSkills] = useState([]);
  const [inputImage, setInputImage] = useState("/image/profile_image_default.jpg");
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: userInfo });
  const { ref, ...rest } = register("imgUrl");

  // form에 사용되는 state value 넣어주기
  useEffect(() => {
    reset(userInfo);
    setSkills(userInfo.skills);
    if (userInfo.imgUrl) {
      setInputImage(userInfo.imgUrl);
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(
      patchUserinfo({
        userId: userInfo._id,
        nickname: data.nickname,
        job: data.job,
        imgUrl: data.imgUrl,
        skills,
      }),
    );
    setAction(true);
  };

  const checkKeyDown = useCallback((e) => {
    if (e.code === "Enter") e.preventDefault();
  }, []);

  const onKeyPress = (e) => {
    if (!e.target.value) return;
    if (e.key === "Enter") {
      setSkills([...skills, e.target.value]);
      e.target.value = "";
    }
  };

  const deleteTagHandler = (e) => {
    setSkills(skills.filter((elem) => elem != e.target.id));
  };

  const imageBtnClickHandler = () => {
    imageinputRef.current.click();
  };

  const addImageHandler = (e) => {
    setInputImage(e.target.value);
    console.log(e.target.value);
  };

  return (
    <form css={myInfoFormStyle} onSubmit={handleSubmit(onSubmit)} onKeyDown={checkKeyDown}>
      <label>{"이메일"}</label>
      <input
        style={{ backgroundColor: "rgb(220,220,220)" }}
        value={(userInfo && userInfo.email) || ""}
        {...register("email")}
      />

      <label>{"별명 *"}</label>
      <input autoComplete="off" {...register("nickname", { required: true })} />

      <label>{"프로필 사진"}</label>
      <button onClick={imageBtnClickHandler} type="button">
        사진 등록하기
      </button>
      <input
        {...rest}
        ref={(e) => {
          ref(e);
          imageinputRef.current = e;
        }}
        style={{ display: "none" }}
        type="file"
        autoComplete="off"
        onChange={addImageHandler}
      />
      <div style={{ width: "150px" }}>
        <Image
          src={"/image/profile_image_default.jpg"}
          layout="responsive"
          width="100%"
          height="100%"
        />
      </div>
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
                <Tag id={e} onClick={deleteTagHandler} key={`${e}+${i}`} color="default">
                  {e}
                </Tag>
              );
            })}
        </div>
      </div>
      <input css={myInfoSubmitBtnStyle} type="submit" value={"회원정보 변경"} />
    </form>
  );
};

export default ProfileMyInfoForm;
