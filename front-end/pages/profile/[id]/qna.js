/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import wrapper from "../../../store/index";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileQnA from "../../../components/userProfile/ProfileQnA";
import { ProfileContentContainer } from "../profileStyle";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { myinfo } from "../../../actions/user";
import { getqnabyuserid } from "../../../actions/qna";
import { useDispatch, useSelector } from "react-redux";
const ProfileCQnA = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { qnabyUserId } = useSelector((state) => state.qna);
  useEffect(() => {
    // 로그인 여부 확인
    dispatch(myinfo());
  }, []);

  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard me={me} />
        <ProfileQnA qnabyUserId={qnabyUserId} />
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
  await store.dispatch(getqnabyuserid(query.id));
  return {
    props: {},
  };
});

export default ProfileCQnA;
