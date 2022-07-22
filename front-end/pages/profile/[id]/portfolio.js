/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfilePortfolio from "../../../components/userProfile/ProfilePortfolio";
import wrapper from "../../../store";
import { ProfileContentContainer } from "../../../styles/profileStyle";
import { loadMyPortfolios } from "../../../actions/portfolio";
import { myinfo, userinfo } from "../../../actions/user";
import axios from "axios";
import Head from "next/head";
import { useSelector } from "react-redux";
const ProfileCPortfolio = () => {
  const { userPortfolios } = useSelector((state) => state.portfolio);

  return (
    <>
      <Head>
        <title>CFDㅣ프로필</title>
      </Head>
      <AppLayout>
        <ProfileNav />
        <div css={ProfileContentContainer}>
          <ProfileCard />
          <ProfilePortfolio portfoliodata={userPortfolios} />
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
      store.dispatch(loadMyPortfolios(query.id)),
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
export default ProfileCPortfolio;
