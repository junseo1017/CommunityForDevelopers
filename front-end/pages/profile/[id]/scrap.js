/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileScrap from "../../../components/userProfile/ProfileScrap";
import { ProfileContentContainer } from "../profileStyle";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { myinfo } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
const ProfileCScrap = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  console.log("scrap");

  useEffect(() => {
    // 로그인 여부 확인
    dispatch(myinfo());
  }, []);
  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard me={me} />
        <ProfileScrap />
      </div>
    </AppLayout>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
//   await store.dispatch(loadMyPortfolios(query.id));
//   return {
//     props: {},
//   };
// });

export default ProfileCScrap;
