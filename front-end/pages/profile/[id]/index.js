/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import wrapper from "../../../store";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileUserInfo from "../../../components/userProfile/ProfileUserInfo";
import { ProfileContentContainer } from "../profileStyle";
import { myinfo, userinfo } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { userInfo, me } = useSelector((state) => state.user);
  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard userInfo={userInfo} />
        <ProfileUserInfo />
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
  const cookie = req?.headers.cookie;
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(userinfo(query.id));
  await store.dispatch(myinfo());
  return {
    props: {},
  };
});

export default Profile;
