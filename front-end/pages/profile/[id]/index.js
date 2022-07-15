/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import wrapper from "../../../store";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileMyInfo from "../../../components/userProfile/ProfileMyInfo";
import { ProfileContentContainer } from "../profileStyle";
import { myinfo } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(me);
  useEffect(() => {
    // 로그인 여부 확인
    dispatch(myinfo());
  }, []);

  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard me={me} />
        <ProfileMyInfo me={me} />
      </div>
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
//   await store.dispatch(myinfo());
//   return {
//     props: {},
//   };
// });

export default Profile;
