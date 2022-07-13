/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import wrapper from "../../store";
import ProfileNav from "../../components/userProfile/ProfileNav";
import AppLayout from "../../components/AppLayout";
import ProfileCard from "../../components/userProfile/ProfileCard";
import ProfileMyInfo from "../../components/userProfile/ProfileMyInfo";
import { ProfileContentContainer } from "./profileStyle";
import { myinfo } from "../../actions/user";
import { useSelector } from "react-redux";

const Profile = () => {
  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard />
        <ProfileMyInfo />
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
