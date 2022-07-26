import React, { useState, useCallback, useRef, useEffect } from "react";
import { portfolioActions } from "../reducers/portfolio";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

const useEditor = () => {
  const editorCore = useRef(null);
  const dispatch = useDispatch();
  const portfolioValue = useSelector(({ portfolio }) => portfolio.singlePortfolio);
  const [imageArray, setImageArray] = useState([]); /* to keep track of uploaded image */
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);
  function removeImage(img) {
    const array = imageArray.filter((image) => image !== img);
    setImageArray(array);
  }
  /* add image to imageArray */
  function addImages(img) {
    imageArray.push(img);
  }
  useEffect(() => {
    if (portfolioValue.content) {
      const editorData = JSON.parse(portfolioValue.content);
      for (const block of editorData.blocks) {
        if (block.type === "image") {
          /* Get the image path and save it in image array for later comparison */
          addImages(block.data.file.url);
        }
      }
    }
  }, []);

  const savePortfolio = async () => {
    /* get the editor.js content and save it to server */
    try {
      const savedData = await editorCore.current.save();
      const contentString = JSON.stringify(savedData);
      const data = {
        content: contentString,
      };
      console.log("savePortf");
      dispatch(portfolioActions.updateState({ content: contentString }));
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
      .forEach((x) => currentImages.push(x.src.includes("firebasestorage") && x.src));

    if (imageArray.length > currentImages.length) {
      /* image deleted */
      for (const img of imageArray) {
        if (!currentImages.includes(img)) {
          try {
            /* delete image from backend */
            axios.defaults.baseURL = backendUrl;
            axios.defaults.withCredentials = true;
            await axios.delete("/api/images", { data: { imgUrl: img } });
            //dispatch(removeImages({ imgUrl: img }));
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
