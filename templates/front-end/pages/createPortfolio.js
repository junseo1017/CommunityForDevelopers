/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useCallback, useRef } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import dynamic from "next/dynamic";
import ResultComp from "../components/CreatePortfolio/ResultComp";
import CreatePortfolioCard from "../components/Portfolo/CreatePortfolioCard";
import StepsComp from "../components/CreatePortfolio/StepsComp";
import ModalAsync from "../components/Common/ModalAsync";

let Editor = dynamic(() => import("../components/Editor/Editor"), {
  ssr: false,
});

const createPortfolio = () => {
  const onChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };

  const editorCore = React.useRef(null);
  const [imageArray, setImageArray] = useState([]); /* to keep track of uploaded image */
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  function removeImage(img) {
    const array = imageArray.filter((image) => image !== img);
    setImageArray(array);
  }

  const savePortfolio = async (e) => {
    e.preventDefault();

    /* get the editor.js content and save it to server */
    try {
      const savedData = await editorCore.current.save();
      console.log(savedData);
      const data = {
        description: JSON.stringify(savedData),
      };
      console.log(data);

      /* Clear all the unused images from server */
      await clearEditorLeftoverImages();

      /* Save portfolio to server */
      //createPortfolio(data);
    } catch (err) {
      console.log(err);
    }
  };

  /* This method will get the current images that are used by editor js,
     and images that stored in imageArray. It will compare and call server request to
     remove unused image */
  const clearEditorLeftoverImages = async () => {
    /* Get editorJs images */
    const currentImages = [];
    document
      .querySelectorAll(".image-tool__image-picture")
      .forEach((x) => currentImages.push(x.src.includes("/images/") && x.src));

    if (imageArray.length > currentImages.length) {
      /* image deleted */
      for (const img of imageArray) {
        if (!currentImages.includes(img)) {
          try {
            /* delete image from backend */
            await API.deleteImage({ imagePath: img });

            /* remove from array */
            removeImage(img);
          } catch (err) {
            console.log(err.message);
          }
        }
      }
    }
  };
  const [current, setCurrent] = useState(0);
  const setCurrentStep = useCallback((num) => {
    setCurrent(num);
  }, []);
  const savePortf = useCallback(savePortfolio, []);

  return (
    <AppLayout>
      <Head>
        <title>포트폴리오 작성</title>
      </Head>
      <ModalAsync />
      <StepsComp current={current} setCurrent={setCurrentStep} save={savePortf} />

      {current === 2 && <ResultComp />}
      {current === 0 && <CreatePortfolioCard />}
      {current === 1 && <Editor handleInitialize={handleInitialize} imageArray={imageArray} />}
    </AppLayout>
  );
};

export default createPortfolio;
