/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AppLayout from "../../components/AppLayout";
import { useCallback } from "react";
import dynamic from "next/dynamic";
import { Affix, Button, Avatar, Comment, Form, Input, List } from "antd";
import { loadPortfolio } from "../../actions/portfolio";
import wrapper from "../../store";
import { useSelector } from "react-redux";
import CommentEditor from "../../components/Portfolo/CommentEditor";
import CommentList from "../../components/Portfolo/CommentList";
import useComment from "../../hooks/useComment";
import { LikeTwoTone, StarTwoTone } from "@ant-design/icons";
import moment from "moment";
import { likePortfolio, unlikePortfolio } from "../../actions/portfolio";
const { TextArea } = Input;

const Output = dynamic(async () => (await import("editorjs-react-renderer")).default, {
  ssr: false,
});
// const { CodeBoxOutput } = dynamic(async () => (await import("editorjs-react-renderer")).default, {
//   ssr: false,
// });

const Portfolio = () => {
  const { singlePortfolio } = useSelector((state) => state.portfolio);
  const { me } = useSelector((state) => state.user);
  console.log(me);
  const onLikePortfolio = useCallback(() => {
    // if (!id) {
    //   message.warn("로그인이 필요합니다.").then();
    //   return;
    // }
    dispatch(
      likePortfolio({
        portfolioId: singlePortfolio._id,
      }),
    );
  }, []);
  const onUnlikePortfolio = useCallback(() => {
    // if (!id) {
    //   message.warn("로그인이 필요합니다.").then();
    //   return;
    // }
    dispatch(
      unlikePortfolio({
        portfolioId: singlePortfolio._id,
      }),
    );
  }, []);
  const affixCss = css`
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 30%;
    bottom: 50%;
    z-index: 99;
    button + button {
      margin-top: 5px;
    }
    @media (max-width: 2390px) {
      right: 20%;
    }
    @media (max-width: 1612px) {
      right: 10%;
    }
    @media (max-width: 1200px) {
      right: 3%;
    }
    @media (max-width: 1022px) {
      position: fixed;

      bottom: 30px;
      right: 30px;
    }
  `;

  const comments = singlePortfolio.comments.map((data, index) => {
    const newData = {
      author: data.author?.nickname,
      avatar: "https://joeschmoe.io/api/v1/random",
      content: data.content,
      datetime: moment(data.createdAt).fromNow(),
    };
    return newData;
  });

  const [submitting, handleChange, handleSubmit, value] = useComment({
    ...me,
    imgUrl: "https://joeschmoe.io/api/v1/random",
    _id: singlePortfolio._id,
  });

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  return (
    <AppLayout>
      <div css={affixCss}>
        <Button size="large" shape="circle" icon={<LikeTwoTone />} />
        <Button size="large" shape="circle" icon={<StarTwoTone />} />
      </div>

      <div style={{ marginBottom: "3rem" }}>{}</div>

      <div style={{ maxWidth: "800px", margin: "0 auto", height: "100%" }}>
        {isJsonString(singlePortfolio.content) ? (
          <Output data={JSON.parse(singlePortfolio.content)} />
        ) : (
          <div>{singlePortfolio.content}</div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          content={
            <CommentEditor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    </AppLayout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  // const cookie = context.req ? context.req.headers.cookie : "";
  // axios.defaults.headers.Cookie = "";
  // // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  // if (context.req && cookie) {
  //   axios.defaults.headers.Cookie = cookie;
  // }
  await store.dispatch(loadPortfolio({ portfolioId: params.id }));
  //await store.dispatch(loadMyInfo());

  return {
    props: {},
  };
});

export default Portfolio;
