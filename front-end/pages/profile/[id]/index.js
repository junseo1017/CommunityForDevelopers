/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import wrapper from "../../../store";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileUserInfo from "../../../components/userProfile/ProfileUserInfo";
import { ProfileContentContainer } from "../../../styles/profileStyle";
import { myinfo, userinfo } from "../../../actions/user";
import Head from "next/head";

import axios from "axios";

const Profile = () => {
  return (
    <>
      <Head>
        <title>CFDㅣ프로필</title>
      </Head>
      <AppLayout>
        <ProfileNav />
        <div css={ProfileContentContainer}>
          <ProfileCard />
          <ProfileUserInfo />
        </div>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
  const cookie = req?.headers.cookie;
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  try {
    await Promise.allSettled([store.dispatch(userinfo(query.id)), store.dispatch(myinfo())]);

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
});

export default Profile;
