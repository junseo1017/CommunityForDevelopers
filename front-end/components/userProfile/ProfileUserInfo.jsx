/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, Button, Tag, message } from "antd";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { profileContentCardContainer } from "./styles/MyInfoStyles";
import ProfileMyInfoForm from "./ProfileMyInfoForm";
import ProfileUserInfoForm from "./ProfileUserInfoForm";
const ProfileUserInfo = () => {
  const [action, setAction] = useState(false);
  const [showMyInfo, setShowMyInfo] = useState(false);
  const { userInfo, me, patchUserDone, patchUserError } = useSelector((state) => state.user);

  // 프로필 조회 유저 본인인지 확인
  useEffect(() => {
    if (me._id === userInfo.userinfo._id) {
      setShowMyInfo(true);
    } else {
      setShowMyInfo(false);
    }
  }, []);

  // 회원정보 변경 요청 시 알림
  useEffect(() => {
    if (action) {
      if (patchUserDone) {
        message.success("회원님의 정보가 변경되었습니다.");
      }
      if (patchUserError) {
        message.error("정보 변경 중 에러가 발생했습니다.");
      }
    }
    setAction(false);
  }, [patchUserDone, patchUserError]);

  return (
    <Card css={profileContentCardContainer}>
      {showMyInfo ? (
        <ProfileMyInfoForm action={action} setAction={setAction} />
      ) : (
        <ProfileUserInfoForm />
      )}
    </Card>
  );
};
export default ProfileUserInfo;
