/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileScrap from "../../../components/userProfile/ProfileScrap";
import { ProfileContentContainer } from "../profileStyle";
import { myinfo, userinfo } from "../../../actions/user";
import { loadScrapPortfolios } from "../../../actions/portfolio";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../../store";
import axios from "axios";

const ProfileCScrap = () => {
  const dispatch = useDispatch();
  const { userScrapPortfolios } = useSelector((state) => state.portfolio);

  useEffect(() => {
    console.log(userScrapPortfolios);
  }, []);

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
