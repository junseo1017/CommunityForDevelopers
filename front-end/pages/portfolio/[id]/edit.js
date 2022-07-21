/** @jsxImportSource @emotion/react */
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import AppLayout from "../../../components/AppLayout";
import dynamic from "next/dynamic";
import { portfolioActions } from "../../../reducers/portfolio";
import ResultComp from "../../../components/CreatePortfolio/ResultComp";
import CreatePortfolioCard from "../../../components/Portfolo/CreatePortfolioCard";
import StepsComp from "../../../components/CreatePortfolio/StepsComp";
import ModalAsync from "../../../components/Common/ModalAsync";
import useEditor from "../../../hooks/useEditor";
import useModalAsync from "../../../hooks/useModalAsync";
import {
  addPortfolio,
  loadPortfolio,
  updatePortfolio /*uploadImages*/,
} from "../../../actions/portfolio";
import { myinfo } from "../../../actions/user";
import wrapper from "../../../store";
import axios from "axios";
import { removeImages } from "../../../actions/image";
import useConfirmModal from "../../../hooks/useConfirmModal";
import Router from "next/router";

let Editor = dynamic(() => import("../../../components/Editor/Editor"), {
  ssr: false,
});

const EditPortfolio = (props) => {
  /* 비로그인 */
  const [imgFormData, setImgFormData] = useState();
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
      const [showConfirm] = useConfirmModal({
        okFunc: redirectLogin,
        cancleFunc: redirectHome,
        message: modalMessage,
      });
      showConfirm();
    }
  }, [error]);

  /* redux */
  const [action, setAction] = useState(null);
  const { imagePaths, addPortfolioLoading, addPortfolioDone, addPortfolioError } = useSelector(
    (state) => state.portfolio,
  );
  const dispatch = useDispatch();

  const dispatchAddPortfolio = useCallback(
    (data, formdata) => {
      const filteredBlocks = JSON.parse(data.content).blocks.map(({ type, data }) => {
        return type === "paragraph" || type === "header" ? data : "";
      });
      const texts = filteredBlocks.map((block) => block.text).join(" ");
      //const newData = { ...data, contentText: texts + data.description, imgUrl: formdata };
      const newData = { ...data, contentText: texts + data.description };
      delete newData.imgSrc;
      //formdata.append("body", JSON.stringify(newData));
      for (const [key, value] of Object.entries(newData)) {
        formdata.append(`${key}`, `${value}`);
      }
      formdata.set("skills", JSON.stringify(newData.skills));
      dispatch(updatePortfolio({ portfolioId: newData._id, formdata }));
    },
    [imgFormData],
  );

  /* 단계 관리 */
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

  /* 첫번째 단계 */
  const onSubmitCard = useCallback((values) => {
    //console.log("Received values of form: ", values);
    const formData = new FormData();
    //if (values.image) formData.append("file", values.image[0].originFileObj);
    if (values.image) formData.append("image", values.image);
    setImgFormData(formData);
    //dispatch(portfolioActions.updateState(value));
    //dispatch(portfolioActions.updateState({ ...values, image: formData }));
    dispatch(portfolioActions.updateState({ ...values, image: "" }));
    //dispatch(uploadImages(formData));
    next();
  }, []);

  //const [savePortf, handleInitialize, imageArray] = useEditor();
  /***                               */
  const editorCore = useRef(null);
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
      .forEach((x) => currentImages.push(x.src.includes("firebasestorage") && x.src));

    if (imageArray.length > currentImages.length) {
      /* image deleted */
      console.log(imageArray);
      console.log("0------------");
      console.log(currentImages);
      for (const img of imageArray) {
        if (!currentImages.includes(img)) {
          try {
            /* delete image from backend */
            //await API.deleteImage({ imagePath: img });
            console.log(img);
            //await axios.delete("/api/images", { imgUrl: img });
            dispatch(removeImages({ imgUrl: img }));
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

  const [modalVisible, setModalVisible, handleOk, confirmLoading, modalText, showModal] =
    useModalAsync(
      savePortf,
      "포트폴리오를 저장하시겠습니까?",
      next,
      dispatchAddPortfolio,
      imgFormData,
    );

  return (
    <AppLayout>
      <Head>
        <title>포트폴리오 수정</title>
      </Head>
      <ModalAsync
        visible={modalVisible}
        setVisible={setModalVisible}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
        modalText={modalText}
      />
      <StepsComp current={current} setCurrent={setCurrentStep} showModal={showModal} prev={prev} />

      {current === 2 && <ResultComp />}
      {current === 0 && <CreatePortfolioCard onSubmitCard={onSubmitCard} />}
      {current === 1 && <Editor handleInitialize={handleInitialize} imageArray={imageArray} />}
    </AppLayout>
  );
};

export default EditPortfolio;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
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
  if (params && params.id) {
    await store.dispatch(loadPortfolio({ portfolioId: params.id }));
  }
});
