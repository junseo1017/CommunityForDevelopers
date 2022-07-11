/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import ProfileNav from "../../components/userProfile/ProfileNav";
import AppLayout from "../../components/AppLayout";
import ProfileCard from "../../components/userProfile/ProfileCard";
import ProfileMyInfo from "../../components/userProfile/ProfileMyInfo";
import { ProfileContentContainer } from "./profileStyle";
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
export default Profile;
