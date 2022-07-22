/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Tag } from "antd";
import { useState } from "react";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { patchUserinfo } from "../../actions/user";
import {
  myInfoSubmitBtnStyle,
  myInfoFormStyle,
  myInfoSkills,
  infoImageFormStyle,
} from "./styles/MyInfoStyles";
import Image from "next/image";

const ProfileMyInfoForm = () => {
  const imageinputRef = useRef("");
  const [skills, setSkills] = useState([]);
  const [imagePreview, setImagePreview] = useState("/image/profile_image_default.jpg");
  const { userinfo } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm(
    userinfo && {
      defaultValues: {
        email: userinfo.email,
        nickname: userinfo.nickname,
        job: userinfo.job,
        image: userinfo.imgUrl,
        skills: userinfo.skills,
      },
    },
  );
  const { ref, ...rest } = register("image");

  // form에 사용되는 state value 넣어주기(imagePreview, skills)
  useEffect(() => {
    if (userinfo) {
      if (userinfo.skills[0] !== "") {
        setSkills(userinfo.skills);
      }
    }
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    if (imageinputRef.current.files[0]) {
      formData.append("image", imageinputRef.current.files[0]);
    }
    formData.append("nickname", data.nickname);
    formData.append("job", data.job);
    formData.append("skills", skills);
    dispatch(patchUserinfo(formData));
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

  // 이미지 미리보기
  const addPreviewImage = (fileBlob) => {
    if (fileBlob) {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImagePreview(reader.result);
          resolve();
        };
      });
    }
  };

  return (
    <form
      css={myInfoFormStyle}
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={checkKeyDown}
      encType="multipart/form-data">
      <label>{"이메일"}</label>
      <input
        style={{ backgroundColor: "rgb(220,220,220)" }}
        readOnly={userinfo?.email || ""}
        {...register("email")}
      />

      <label>{"별명 *"}</label>
      <input autoComplete="off" {...register("nickname", { required: true })} />

      <label>{"프로필 사진"}</label>
      <div css={infoImageFormStyle}>
        <label htmlFor="imageInput">사진 등록하기</label>
        <input
          ref={(e) => {
            ref(e);
            imageinputRef.current = e;
          }}
          id="imageInput"
          type="file"
          name="image"
          onChange={(e) => addPreviewImage(e.target.files[0])}
        />
        <div style={{ width: "200px" }}>
          <Image
            priority
            src={imagePreview}
            layout="responsive"
            width="100%"
            height="100%"
            alt="프로필 이미지 미리보기"
          />
        </div>
      </div>

      <label>{"직업"}</label>
      <input
        {...register("job")}
        list="list"
        autoComplete="off"
        placeholder="직업을 입력해주세요"
      />
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
        <input placeholder="입력 후 Enter를 눌러주세요" autoComplete="off" onKeyDown={onKeyPress} />
        {skills.length > 0 && (
          <div>
            {skills.map((e, i) => {
              return (
                <Tag id={e} onClick={deleteTagHandler} key={`${e}+${i}`} color="default">
                  {e}
                </Tag>
              );
            })}
          </div>
        )}
      </div>
      <input css={myInfoSubmitBtnStyle} type="submit" value={"회원정보 변경"} />
    </form>
  );
};

export default ProfileMyInfoForm;
