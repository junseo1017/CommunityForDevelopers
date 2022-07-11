import React, { useState, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

const useEditor = () => {
  const editorCore = useRef(null);
  const portfolioValue = useSelector(({ portfolio }) => portfolio);
  const [imageArray, setImageArray] = useState([]); /* to keep track of uploaded image */
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);
  function removeImage(img) {
    const array = imageArray.filter((image) => image !== img);
    setImageArray(array);
  }

  const savePortfolio = async () => {
    /* get the editor.js content and save it to server */
    try {
      const savedData = await editorCore.current.save();
      console.log(savedData);
      const data = {
        content: JSON.stringify(savedData),
      };

      /* Clear all the unused images from server */
      await clearEditorLeftoverImages();
      return { ...portfolioValue, ...data };
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
  const savePortf = useCallback(savePortfolio, [portfolioValue]);

  return [savePortf, handleInitialize, imageArray];
};

export default useEditor;
