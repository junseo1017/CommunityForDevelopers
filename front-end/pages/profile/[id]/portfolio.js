/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfilePortfolio from "../../../components/userProfile/ProfilePortfolio";
import wrapper from "../../../store";
import { ProfileContentContainer } from "../profileStyle";
import { useDispatch, useSelector } from "react-redux";
import { loadMyPortfolios } from "../../../actions/portfolio";
import { useEffect } from "react";
import { myinfo } from "../../../actions/user";
const ProfileCPortfolio = () => {
  const dispatch = useDispatch();
  const { myPortfolios, me } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(myinfo());
  }, []);
  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard me={me} />
        <ProfilePortfolio myPortfolios={myPortfolios} />
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
  await store.dispatch(loadMyPortfolios(query.id));
  return {
    props: {},
  };
});

export default ProfileCPortfolio;
