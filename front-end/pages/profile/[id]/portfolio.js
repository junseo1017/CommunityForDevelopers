/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfilePortfolio from "../../../components/userProfile/ProfilePortfolio";
import wrapper from "../../../store";
import { ProfileContentContainer } from "../profileStyle";
import { loadMyPortfolios } from "../../../actions/portfolio";
import { myinfo, userinfo } from "../../../actions/user";
import axios from "axios";

const ProfileCPortfolio = () => {
  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard />
        <ProfilePortfolio />
      </div>
    </AppLayout>
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
  await store.dispatch(loadMyPortfolios(query.id));
  return {
    props: {},
  };
});

export default ProfileCPortfolio;
