/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import wrapper from "../../../store";
import ProfileNav from "../../../components/userProfile/ProfileNav";
import AppLayout from "../../../components/AppLayout";
import ProfileEditPw from "../../../components/userProfile/ProfileEditPw";
import { useEffect } from "react";
import { ProfileContentContainer } from "../../../styles/profileStyle";
import { myinfo, userinfo } from "../../../actions/user";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const EditPassword = () => {
  const router = useRouter();
  const { me, userInfo } = useSelector((state) => state.user);

  // 다른 유저가 임의로 url 접근했을 때 홈으로 푸쉬
  useEffect(() => {
    if (!me) router.push("/");
    if (me && userInfo) {
      me._id === userInfo?.userinfo?._id ? console.log("hi") : router.push("/");
    }
  }, [me, userInfo]);

  return (
    <AppLayout>
      <ProfileNav />
      <div css={ProfileContentContainer}>
        <ProfileEditPw />
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

export default EditPassword;
