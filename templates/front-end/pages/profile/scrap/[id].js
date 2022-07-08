/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileScrap from "../../../components/userProfile/ProfileScrap";
import { ProfileContentContainer } from "../profileStyle";
import { useRouter } from "next/router";
const Profile = () => {
  const router = useRouter();
  console.log(router.query.id);
  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard />
        <ProfileScrap />
      </div>
    </AppLayout>
  );
};
export default Profile;
