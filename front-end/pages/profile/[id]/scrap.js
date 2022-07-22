/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfilePortfolio from "../../../components/userProfile/ProfilePortfolio";
import { ProfileContentContainer } from "../../../styles/profileStyle";
import { myinfo, userinfo } from "../../../actions/user";
import { loadScrapPortfolios } from "../../../actions/portfolio";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../../store";
import axios from "axios";
import Head from "next/head";

const ProfileCScrap = () => {
  const { userScrapPortfolios } = useSelector((state) => state.portfolio);
  return (
    <>
      <Head>
        <title>CFDㅣ프로필</title>
      </Head>
      <AppLayout>
        <ProfileNav />
        <div css={ProfileContentContainer}>
          <ProfileCard />
          <ProfilePortfolio portfoliodata={userScrapPortfolios} />
        </div>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query, req }) => {
  const cookie = req?.headers.cookie;
  axios.defaults.headers.Cookie = "";
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  await store.dispatch(myinfo());
  await store.dispatch(userinfo(query.id));
  await store.dispatch(loadScrapPortfolios(query.id));
  return {
    props: {},
  };
});

export default ProfileCScrap;
