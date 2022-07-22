/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import wrapper from "../../../store/index";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileQnA from "../../../components/userProfile/ProfileQnA";
import { ProfileContentContainer } from "../../../styles/profileStyle";
import { myinfo, userinfo } from "../../../actions/user";
import { getqnabyuserid } from "../../../actions/qna";
import axios from "axios";
import Head from "next/head";

const ProfileCQnA = () => {
  return (
    <>
      <Head>
        <title>CFDㅣ프로필</title>
      </Head>
      <AppLayout>
        <ProfileNav />
        <div css={ProfileContentContainer}>
          <ProfileCard />
          <ProfileQnA />
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
    await Promise.allSettled([
      store.dispatch(userinfo(query.id)),
      store.dispatch(myinfo()),
      store.dispatch(getqnabyuserid(query.id)),
    ]);

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
});

export default ProfileCQnA;
