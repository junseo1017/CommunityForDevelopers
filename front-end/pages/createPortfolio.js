/** @jsxImportSource @emotion/react */
import React, { useState, useCallback } from "react";
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
import { addPortfolio /*uploadImages*/ } from "../actions/portfolio";

let Editor = dynamic(() => import("../components/Editor/Editor"), {
  ssr: false,
});

const createPortfolio = () => {
  /* redux */
  const [action, setAction] = useState(null);
  const { imagePaths, addPortfolioLoading, addPortfolioDone, addPortfolioError } = useSelector(
    (state) => state.portfolio,
  );
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo.email);
  const dispatch = useDispatch();
  const dispatchAddPortfolio = useCallback((data) => {
    dispatch(addPortfolio(data));
  }, []);

  const [current, setCurrent] = useState(0);
  const [cardValue, setCardValue] = useState({
    titleValue: "",
    descriptionValue: "",
    imageValue: "",
    skillsValue: "",
  });
  const setPortfCardValue = useCallback((value) => {
    setCardValue(value);
  }, []);
  const setCurrentStep = useCallback((num) => {
    setCurrent(num);
  }, []);
  const next = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, [current]);
  const prev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, [current]);
  const onSubmitCard = useCallback(() => {
    console.log("Received values of form: ", cardValue);
    let formData = new FormData();
    formData.append("file", cardValue.image[0].originFileObj);
    dispatch(portfolioActions.updateState({ ...cardValue, image: "tempURL" }));
  }, [cardValue]);
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
        next={next}
        prev={prev}
      />

      {current === 2 && <ResultComp />}
      {current === 0 && <CreatePortfolioCard setPortfCardValue={setPortfCardValue} />}
      {current === 1 && <Editor handleInitialize={handleInitialize} imageArray={imageArray} />}
    </AppLayout>
  );
};

export default createPortfolio;
