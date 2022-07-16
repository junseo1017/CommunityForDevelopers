/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import wrapper from "../../../store/index";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileCard from "../../../components/userProfile/ProfileCard";
import ProfileQnA from "../../../components/userProfile/ProfileQnA";
import { ProfileContentContainer } from "../profileStyle";
import { myinfo, userinfo } from "../../../actions/user";
import { getqnabyuserid } from "../../../actions/qna";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const ProfileCQnA = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { qnabyUserId } = useSelector((state) => state.qna);

  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileCard />
        <ProfileQnA />
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
  await store.dispatch(getqnabyuserid(query.id));
  return {
    props: {},
  };
});

export default ProfileCQnA;
