/** @jsxImportSource @emotion/react */
import React, { useState, useCallback } from "react";

import Head from "next/head";
import AppLayout from "../components/AppLayout";
import dynamic from "next/dynamic";
import ResultComp from "../components/CreatePortfolio/ResultComp";
import CreatePortfolioCard from "../components/Portfolo/CreatePortfolioCard";
import StepsComp from "../components/CreatePortfolio/StepsComp";
import ModalAsync from "../components/Common/ModalAsync";
import useEditor from "../hooks/useEditor";
import useModalAsync from "../hooks/useModalAsync";

let Editor = dynamic(() => import("../components/Editor/Editor"), {
  ssr: false,
});

const createPortfolio = () => {
  const [current, setCurrent] = useState(0);
  const setCurrentStep = useCallback((num) => {
    setCurrent(num);
  }, []);
  const next = () => {
    setCurrent(current + 1);
  };
  const [savePortf, handleInitialize, imageArray] = useEditor();
  const [modalVisible, setModalVisible, handleOk, confirmLoading, modalText, showModal] =
    useModalAsync(savePortf, "포트폴리오를 저장하시겠습니까?", next);

  const onSubmit = useCallback((data) => console.log(data), []);

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
        save={savePortf}
        showModal={showModal}
        next={next}
      />

      {current === 2 && <ResultComp />}
      {current === 0 && <CreatePortfolioCard onSubmit={onSubmit} />}
      {current === 1 && <Editor handleInitialize={handleInitialize} imageArray={imageArray} />}
    </AppLayout>
  );
};

export default createPortfolio;
