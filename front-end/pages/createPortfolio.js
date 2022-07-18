/** @jsxImportSource @emotion/react */
import { useState, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import dynamic from "next/dynamic";
import { portfolioActions } from "../reducers/portfolio";
import ResultComp from "../components/CreatePortfolio/ResultComp";
import CreatePortfolioCard from "../components/Portfolo/CreatePortfolioCard";
import StepsComp from "../components/CreatePortfolio/StepsComp";
import ModalAsync from "../components/Common/ModalAsync";
import useEditor from "../hooks/useEditor";
import useModalAsync from "../hooks/useModalAsync";
import { addPortfolio, uploadImages /*uploadImages*/ } from "../actions/portfolio";
import { myinfo } from "../actions/user";
import wrapper from "../store";
import axios from "axios";
import useConfirmModal from "../hooks/useConfirmModal";
import Router from "next/router";

let Editor = dynamic(() => import("../components/Editor/Editor"), {
  ssr: false,
});

const createPortfolio = (props) => {
  const { error } = props;
  const redirectLogin = useCallback(() => {
    Router.push("/login");
  }, []);
  const redirectHome = useCallback(() => {
    Router.push("/");
  }, []);
  const modalMessage = useMemo(
    () => ({
      title: "로그인 화면으로 이동합니다",
      description: "취소하면 홈으로 이동합니다.",
    }),
    [],
  );

  useEffect(() => {
    if (error) {
      const [showConfirm] = useConfirmModal(redirectLogin, redirectHome, modalMessage);
      showConfirm();
    }
  }, [error]);

  /* redux */
  const [action, setAction] = useState(null);
  const { imagePaths, addPortfolioLoading, addPortfolioDone, addPortfolioError } = useSelector(
    (state) => state.portfolio,
  );

  const dispatch = useDispatch();
  const dispatchAddPortfolio = useCallback((data) => {
    const filteredBlocks = JSON.parse(data.content).blocks.map(({ type, data }) => {
      return type === "paragraph" || type === "header" ? data : "";
    });
    const texts = filteredBlocks.map((block) => block.text).join(" ");
    const newData = { ...data, contentText: texts + data.description, imgSrc: "tempUrl" };
    dispatch(addPortfolio(newData));
  }, []);

  const [current, setCurrent] = useState(0);

  const setCurrentStep = useCallback((num) => {
    setCurrent(num);
  }, []);
  const next = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, [current]);
  const prev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, [current]);
  const onSubmitCard = useCallback((values) => {
    console.log("Received values of form: ", values);
    let formData = new FormData();
    //if (values.image) formData.append("file", values.image[0].originFileObj);
    if (values.image) formData.append("file", values.image);
    //dispatch(portfolioActions.updateState(value));
    //dispatch(portfolioActions.updateState({ ...values, image: formData }));
    dispatch(portfolioActions.updateState({ ...values, image: "" }));
    dispatch(uploadImages(formData));
    next();
  }, []);
  const [savePortf, handleInitialize, imageArray] = useEditor();
  const [modalVisible, setModalVisible, handleOk, confirmLoading, modalText, showModal] =
    useModalAsync(savePortf, "포트폴리오를 저장하시겠습니까?", next, dispatchAddPortfolio);

  return (
    <AppLayout>
      <Head>
        <title>포트폴리오 작성</title>
      </Head>
      <ModalAsync
        visible={modalVisible}
        setVisible={setModalVisible}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
        modalText={modalText}
      />
      <StepsComp
        current={current}
        setCurrent={setCurrentStep}
        onSubmitCard={onSubmitCard}
        showModal={showModal}
        prev={prev}
      />

      {current === 2 && <ResultComp />}
      {current === 0 && <CreatePortfolioCard onSubmitCard={onSubmitCard} />}
      {current === 1 && <Editor handleInitialize={handleInitialize} imageArray={imageArray} />}
    </AppLayout>
  );
};

export default createPortfolio;

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
