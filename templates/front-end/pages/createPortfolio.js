import React, { useState, useCallback, useRef } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import dynamic from "next/dynamic";

let Editor = dynamic(() => import("../components/PortfolioEdit/Editor"), {
  ssr: false,
});

const createPortfolio = () => {
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

  return (
    <AppLayout>
      <Head>
        <title>포트폴리오 작성</title>
      </Head>
      <h1>포트폴리오 작성</h1>
      <button onClick={savePortfolio}>Save</button>
      <Editor handleInitialize={handleInitialize} imageArray={imageArray} />
    </AppLayout>
  );
};

export default createPortfolio;
