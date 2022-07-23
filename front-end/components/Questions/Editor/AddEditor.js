/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Button, Modal } from "antd";
import { EditorContainer } from "../styles/QuestionStyle";
import axios from "axios";
import router from "next/router";
import ModalAsync from "../../Common/ModalAsync";
import useModalAsync from "../../../hooks/useModalAsync";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

const AddEditor = ({ title, data, isAnswer, qnaId, parentQnaId, tags, isUpdate, setChanged }) => {
  const editorCore = useRef(null);
  // 업로드된 이미지 추적
  const [imageArray, setImageArray] = useState([]);

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  // 이미지 제거 함수
  const removeImage = (img) => {
    const newArr = imageArray.filter((image) => image !== img);
    setImageArray(newArr);
  };

  const addImages = (image) => {
    imageArray.push(image);
  };

  // useEffect(() => {
  //   if (data) {
  //     const editorData = JSON.parse(data);
  //     for (const block of editorData.blocks) {
  //       if (block.type === "image") {
  //         addImages(block.data.file.url);
  //       }
  //     }
  //   }
  // }, [data]);

  const saveQna = async () => {
    console.log("saving");
    const savedData = await editorCore.current.save();
    const filteredBlocks = savedData.blocks.map(({ type, data }) => {
      return type === "paragraph" || type === "header" ? data : "";
    });

    const contentText = filteredBlocks.map((block) => block.text).join(" ");

    // 에디터의 컨텐츠를 가져와 서버에 저장하기

    try {
      await axios.post("/api/qnas", {
        title,
        contents: JSON.stringify(savedData),
        contentText,
        isAnswer,
        parentQnaId,
        tags,
      });

      // 서버에서 사용하지 않는 이미지 제거하기
      await clearEditorLeftoverImages();

      // 서버에 질문 저장하기
      if (isAnswer) {
        router.push(`/qna/${parentQnaId}`);
        return;
      }
      router.push(`/qna`);
    } catch (e) {
      console.log(e);
    }
  };

  const updateQna = async () => {
    console.log("Updating");
    const savedData = await editorCore.current.save();
    const filteredBlocks = savedData.blocks.map(({ type, data }) => {
      return type === "paragraph" || type === "header" ? data : "";
    });

    const contentText = filteredBlocks.map((block) => block.text).join(" ");

    // 에디터의 컨텐츠를 가져와 서버에 저장하기
    try {
      await axios.put(`/api/qnas/${qnaId}`, {
        contents: JSON.stringify(savedData),
        contentText,
        isAnswer,
      });
      if (isAnswer) {
        console.log("페이지 push parent");
        setChanged && setChanged(true);
        router.push(`/qna/${parentQnaId}`);
        return;
      } else {
        console.log("페이지 push id");
        setChanged && setChanged(true);
        router.push(`/qna/${qnaId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 사용하지 않는 이미지를 제거하기 위해 imageArray와 현재 에디터의 이미지를 가져와 비교하기
  const clearEditorLeftoverImages = async () => {
    // 현재 에디터의 이미지 가져오기(src에 '/images/'가 존재하는 요소)
    const currentImages = [];
    document
      .querySelectorAll(".image-tool__image-picture")
      .forEach((img) => currentImages.push(img.src.includes("/images/") && img.src));

    if (imageArray.length > currentImages.length) {
      for (const img of imageArray) {
        if (!currentImages.includes(img)) {
          try {
            // 서버에서 이미지 삭제하기
            await axios.delete(`/api/images`, { imgUrl: img });

            // imageArray에서 삭제하기
            removeImage(img);
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    }
  };
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("작성한 질문 혹은 답변을 저장하시겠습니까?");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    isUpdate ? await updateQna() : await saveQna();
    setChanged && setChanged(false);
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div className="editor-container">
      <Modal
        title="저장하시겠습니까?"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p>{modalText}</p>
      </Modal>
      <Editor handleInitialize={handleInitialize} imageArray={imageArray} data={data} />
      <Button
        className="editor-submitBtn"
        onClick={() => {
          showModal();
        }}>
        저장
      </Button>
    </div>
  );
};

export default AddEditor;
