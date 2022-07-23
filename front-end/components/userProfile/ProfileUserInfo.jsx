/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Card, message } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { profileContentCardContainer } from "./styles/MyInfoStyles";
import ProfileMyInfoForm from "./ProfileMyInfoForm";
import ProfileUserInfoForm from "./ProfileUserInfoForm";
import ProfileEditInfo from "./ProfileEditInfo";
import { useRouter } from "next/router";

const ProfileUserInfo = () => {
  const router = useRouter();
  const [showMyInfo, setShowMyInfo] = useState(false);
  const { userInfo, me, patchUserDone, patchUserError } = useSelector((state) => state.user);

  // 프로필 조회 유저 본인인지 확인
  useEffect(() => {
    if (router.query.id === "undefined") {
      message.error("잘못된 접근입니다.");
      router.push("/");
    }
    if (me && userInfo) {
      if (me._id === userInfo.userinfo?._id) {
        setShowMyInfo(true);
      } else {
        setShowMyInfo(false);
      }
    }
  }, []);

  // 회원정보 변경 요청 시 알림
  useEffect(() => {
    if (patchUserDone) {
      message.success("회원님의 정보가 변경되었습니다.");
    }
    if (patchUserError) {
      message.error("정보 변경 중 에러가 발생했습니다.");
    }
  }, [patchUserDone, patchUserError]);

  return (
    <Card css={profileContentCardContainer}>
      {showMyInfo ? (
        <>
          <ProfileMyInfoForm />
          <ProfileEditInfo />
        </>
      ) : (
        <ProfileUserInfoForm />
      )}
    </Card>
  );
};
export default ProfileUserInfo;
