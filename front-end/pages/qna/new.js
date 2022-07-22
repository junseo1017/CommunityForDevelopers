/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Head from "next/head";
import { Input, Modal } from "antd";
import AppLayout from "../../components/AppLayout";
import AddEditor from "../../components/Questions/Editor/AddEditor";
import AddTags from "../../components/Questions/AddTag";
import { EditorContainer } from "../../components/Questions/styles/QuestionStyle";
import { useState, useCallback, useMemo, useEffect } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import useConfirmModal from "../../hooks/useConfirmModal";
import wrapper from "../../store";
import axios from "axios";
import { myinfo } from "../../actions/user";

const newQuestion = ({ error }) => {
  const redirectLogin = useCallback(() => {
    Router.push("/login");
  }, []);
  const redirectHome = useCallback(() => {
    Router.push("/");
  }, []);
  const modalMessage = useMemo(
    () => ({
      title: "로그인이 필요한 서비스입니다.",
      description: "로그인 하시겠습니까? 취소하면 홈으로 이동합니다.",
    }),
    [],
  );
  useEffect(() => {
    if (error) {
      const [showConfirm] = useConfirmModal({
        okFunc: redirectLogin,
        cancleFunc: redirectHome,
        message: modalMessage,
      });
      showConfirm();
    }
  }, []);

  const [questionTitle, setQuestionTitle] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <AppLayout>
      <Head>
        <title>질문하기</title>
      </Head>
      <div css={EditorContainer}>
        <h1>질문하기</h1>
        <Input
          size="large"
          placeholder="질문의 제목을 작성하세요"
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
        <AddTags addTags={setTags} />
        <AddEditor title={questionTitle} isAnswer={false} parentQnaId={""} tags={tags} />
      </div>
    </AppLayout>
  );
};

export default newQuestion;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
  axios.defaults.headers.Cookie = ""; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  } else {
    return {
      props: { error: "You are not authanticated" },
    };
  }
  await store.dispatch(myinfo());
});
