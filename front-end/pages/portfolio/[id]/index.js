/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import styled from "@emotion/styled";
import AppLayout from "../../../components/AppLayout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo } from "react";
import useConfirmModal from "../../../hooks/useConfirmModal";
import axios from "axios";
import { Affix, Button, Avatar, Comment, Form, Input, List } from "antd";
import { removePortfolio } from "../../../actions/portfolio";

import {
  loadPortfolio,
  likePortfolio,
  scrapPortfolio,
  unlikePortfolio,
  unscrapPortfolio,
  removeComment,
} from "../../../actions/portfolio";
import { myinfo } from "../../../actions/user";
import wrapper from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import CommentEditor from "../../../components/Portfolo/CommentEditor";
import CommentList from "../../../components/Portfolo/CommentList";
import useComment from "../../../hooks/useComment";
import { LikeTwoTone, StarTwoTone, LikeOutlined, StarOutlined } from "@ant-design/icons";
import moment from "moment";
import Router from "next/router";

const { TextArea } = Input;

const Output = dynamic(async () => (await import("editorjs-react-renderer")).default, {
  ssr: false,
});
// const { CodeBoxOutput } = dynamic(async () => (await import("editorjs-react-renderer")).default, {
//   ssr: false,
// });

const Portfolio = () => {
  const dispatch = useDispatch();
  const { singlePortfolio, loadPortfoliosDone } = useSelector((state) => state.portfolio);
  const { me } = useSelector((state) => state.user);

  const liked = singlePortfolio?.recommends?.find((v) => v === me._id);
  const scrapped = singlePortfolio?.scraps?.find((v) => v === me._id);

  const redirectLogin = useCallback(() => {
    Router.push("/login");
  }, []);
  const modalMessage = useMemo(
    () => ({
      title: "로그인이 필요한 서비스 입니다.",
      description: "로그인해 주세요.",
    }),
    [],
  );
  const [showConfirm] = useConfirmModal({
    okFunc: redirectLogin,
    message: modalMessage,
  });
  const onClickLikePort = () => {
    if (!me) {
      showConfirm();
    }
    if (liked) dispatch(unlikePortfolio({ portfolioId: singlePortfolio?._id, UserId: me._id }));
    else dispatch(likePortfolio({ portfolioId: singlePortfolio?._id, UserId: me._id }));
  };
  const onClickScrapPort = () => {
    if (!me) {
      showConfirm();
    }
    if (scrapped) dispatch(unscrapPortfolio({ portfolioId: singlePortfolio?._id, UserId: me._id }));
    else dispatch(scrapPortfolio({ portfolioId: singlePortfolio?._id, UserId: me._id }));
  };

  const comments = singlePortfolio.comments.map((data, index) => {
    if (!data.isDeleted) {
      const newData = {
        actions: [
          me?._id === data?.author?._id && (
            <span
              onClick={() => {
                dispatch(removeComment({ commentId: data?._id }));
              }}
              key={`comment-basic-reply-to${data?._id}`}>
              삭제
            </span>
          ),
        ],
        author: (
          <Link href={`/profile/${data?.author?._id}`}>
            <a>{data?.author?.nickname}</a>
          </Link>
        ),
        avatar: (
          <Link href={`/profile/${data?.author?._id}`}>
            <Avatar
              src={data?.author?.imgUrl || "https://joeschmoe.io/api/v1/random"}
              alt="Han Solo"
            />
          </Link>
        ),
        content: data?.content,
        datetime: moment(data?.createdAt).fromNow(),
      };
      return newData;
    }
  });

  const [submitting, handleChange, handleSubmit, value] = useComment({
    ...me,
    Portf_id: singlePortfolio._id,
  });

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };
  const removeMyPortfolio = useCallback(() => {
    dispatch(removePortfolio({ portfolioId: singlePortfolio._id }));
    Router.push("/");
  }, []);

  const onRemoveBtn = () => {
    const [showConfirm] = useConfirmModal({
      okFunc: removeMyPortfolio,
      message: {
        title: "정말로 삭제하겠습니까?",
        description: "삭제하고 홈으로 돌아갑니다.",
      },
    });
    showConfirm();
  };

  const onEditBtn = () => {
    const [showConfirm] = useConfirmModal({
      okFunc: () => {
        Router.push(`/portfolio/${singlePortfolio._id}/edit`);
      },
      message: {
        title: "수정하겠습니까?",
        description: "수정하는 페이지로 갑니다.",
      },
    });
    showConfirm();
  };

  if (loadPortfoliosDone === false) return <div>loading...</div>;

  return (
    <AppLayout>
      {me._id === singlePortfolio.authorId ? (
        <div style={{ paddingTop: "20px", width: "100%", display: "flex", justifyContent: "end" }}>
          <div>
            <Button
              type="primary"
              ghost
              style={{
                margin: "0 8px",
              }}
              onClick={onEditBtn}>
              수정
            </Button>
          </div>
          <Button danger onClick={onRemoveBtn}>
            삭제
          </Button>
        </div>
      ) : (
        <div style={{ marginBottom: "3rem" }}>{}</div>
      )}
      <ButtonContainer borderLike={liked} borderScrap={scrapped}>
        <Button
          onClick={onClickLikePort}
          size="large"
          shape="circle"
          icon={liked ? <LikeTwoTone /> : <LikeOutlined />}
        />
        <Button
          onClick={onClickScrapPort}
          size="large"
          shape="circle"
          icon={scrapped ? <StarTwoTone /> : <StarOutlined />}
        />
      </ButtonContainer>

      {/*  maxWidth: "800px", */}

      {isJsonString(singlePortfolio.content) ? (
        <section
          css={EditorSize}
          style={{ width: "100%", overflow: "auto", overflowWrap: "break-word" }}>
          <Output data={JSON.parse(singlePortfolio.content)} />
        </section>
      ) : (
        <div>{singlePortfolio.content}</div>
      )}

      <div style={{ width: "100%" }}>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar src={me.imgUrl || "https://joeschmoe.io/api/v1/random"} alt="Han Solo" />}
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
  axios.defaults.headers.Cookie = ""; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  if (params && params.id) {
    await store.dispatch(loadPortfolio({ portfolioId: params.id }));
  }
  await store.dispatch(myinfo());

  return {
    props: {},
  };
});

export default Portfolio;

export const EditorSize = css`
  & > figure {
    height: 100% !important;
    max-height: 100% !important;
  }
  & > figure > img {
    height: 100% !important;
    max-height: 100% !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 30%;
  bottom: 50%;
  z-index: 99;
  .ant-btn-circle.ant-btn-lg {
    min-width: 43px;
    min-height: 43px;
  }
  .ant-btn:first-of-type {
    border-color: ${(props) => (props.borderLike ? "#1890ff" : "#d9d9d9")};
  }
  .ant-btn:last-of-type {
    border-color: ${(props) => (props.borderScrap ? "#1890ff" : "#d9d9d9")};
  }

  .ant-btn:focus {
    color: #000;
    border-color: #d9d9d9;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  }
  .ant-btn:hover {
    width: 45px;
    height: 45px;
  }
  button + button {
    margin-top: 5px;
  }
  @media (max-width: 2390px) {
    right: 15%;
  }
  @media (max-width: 1612px) {
    right: 5%;
  }
  @media (max-width: 1200px) {
    right: 1%;
  }
  @media (max-width: 1022px) {
    position: fixed;

    bottom: 30px;
    right: 30px;
  }
`;
